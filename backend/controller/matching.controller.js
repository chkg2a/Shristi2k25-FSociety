import Document from "../model/document.model.js";
import User from "../model/user.model.js";
import UsageLog from "../model/UsageLog.model.js";
import { matchDocuments as matchWithCosine  } from "../service/matchingService.js";


export const matchDocuments = async (req, res) => {
    try {
      const { sourceDocumentId, targetDocumentId } = req.body;
        
      if (!sourceDocumentId || !targetDocumentId ) {
        return res.status(400).json({ message: 'Invalid request parameters' });
      }
  
      if (req.user.credits <= 0) {
        return res.status(403).json({
          message: 'Insufficient credits. Please request more credits.',
        });
      }
  
      
      req.user.credits -= 1;
      req.user.totalScans += 1;
      await req.user.save();
  
     
      await UsageLog.create({
        userId: req.user._id,
        actionType: 'scan',
        documentId: sourceDocumentId,
      });
  
      
      const sourceDoc = await Document.findById(sourceDocumentId);
      
      if (!sourceDoc) {
        return res.status(404).json({ message: 'Source document not found' });
      }
      
      const targetDocs = await Document.find({ _id: { $in: targetDocumentId } });

      
      

      const results = await matchWithCosine(sourceDoc, targetDocs);
  
      res.status(200).json({
        message: 'Documents matched successfully',
        results,
        remainingCredits: req.user.credits,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };