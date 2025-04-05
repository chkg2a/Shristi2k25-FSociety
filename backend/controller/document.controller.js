import User from "../model/user.model.js";
import Document from "../model/document.model.js";
import UsageLog from "../model/UsageLog.model.js";
import fs from "fs";
import path from "path";


const processDocument = async (filePath) => {
  try {
    const text = fs.readFileSync(filePath, 'utf8');
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];

    const wordFrequency = new Map();
    words.forEach(word => {
      wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
    });

    return {
      contentText: text,
      wordFrequency: Object.fromEntries(wordFrequency),
    };
  } catch (error) {
    throw new Error(`Error processing document: ${error.message}`);
  }
};


const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { contentText, wordFrequency } = await processDocument(req.file.path);

    const document = new Document({
      userId: req.user._id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      contentText,
      wordFrequency,
    });

    await document.save();

    const usageLog = new UsageLog({
      userId: req.user._id,
      actionType: 'upload',
      documentId: document._id,
    });

    await usageLog.save();

    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: 'Document uploaded successfully',
      documentId: document._id,
      originalName: document.originalName,
    });

  } catch (error) {
    console.log(error.message);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // cleanup
    }
    res.status(500).json({ message: "Internal server error" });
  }
};


const getUserDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user._id })
      .select('originalName uploadDate _id')
      .sort({ uploadDate: -1 });

    res.status(200).json({ documents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const usageLog = new UsageLog({
      userId: req.user._id,
      actionType: 'download',
      documentId: document._id,
    });
    await usageLog.save();

    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFilePath = path.join(tempDir, document.originalName);
    fs.writeFileSync(tempFilePath, document.contentText);

    res.download(tempFilePath, document.originalName, (err) => {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }

      if (err && !res.headersSent) {
        res.status(500).json({ message: 'Error downloading document' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const compareDocuments = async (req, res) => {
  try {
    if (!req.files || !req.files.file1 || !req.files.file2) {
      return res.status(400).json({ message: "Please upload both files for comparison" });
    }

    const file1 = req.files.file1[0];
    const file2 = req.files.file2[0];

    const { contentText: text1, wordFrequency: freq1 } = await processDocument(file1.path);
    const { contentText: text2, wordFrequency: freq2 } = await processDocument(file2.path);

    // Calculate similarity
    const similarity = calculateSimilarity(freq1, freq2);

    // Clean up uploaded files
    fs.unlinkSync(file1.path);
    fs.unlinkSync(file2.path);

    res.status(200).json({
      message: "Documents compared successfully",
      similarity: similarity,
      details: {
        file1: {
          name: file1.originalname,
          wordCount: Object.keys(freq1).length
        },
        file2: {
          name: file2.originalname,
          wordCount: Object.keys(freq2).length
        }
      }
    });
  } catch (error) {
    console.error("Error comparing documents:", error);
    res.status(500).json({ message: "Error comparing documents" });
  }
};

const calculateSimilarity = (freq1, freq2) => {
  const allWords = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);
  let commonWords = 0;
  let totalWords = 0;

  allWords.forEach(word => {
    const count1 = freq1[word] || 0;
    const count2 = freq2[word] || 0;
    commonWords += Math.min(count1, count2);
    totalWords += Math.max(count1, count2);
  });

  return totalWords === 0 ? 0 : (commonWords / totalWords) * 100;
};

export {
  uploadDocument,
  getUserDocuments,
  getDocument,
  downloadDocument,
  compareDocuments
};
