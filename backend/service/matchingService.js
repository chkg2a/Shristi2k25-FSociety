const cosineSimilarity = (doc1, doc2) => {
   
    const freq1 = doc1.wordFrequency instanceof Map ? doc1.wordFrequency : new Map();
    const freq2 = doc2.wordFrequency instanceof Map ? doc2.wordFrequency : new Map();
    
    const allWords = new Set([...freq1.keys(), ...freq2.keys()]);
    const vector1 = [];
    const vector2 = [];
  
    for (const word of allWords) {
      vector1.push(freq1.get(word) || 0);
      vector2.push(freq2.get(word) || 0);
    }
    
    const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val ** 2, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val ** 2, 0));
    
    console.log("Dot product:", dotProduct);
    console.log("Magnitude 1:", magnitude1);
    console.log("Magnitude 2:", magnitude2);
    
    
    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
    }
    
    return dotProduct / (magnitude1 * magnitude2);
};

export const matchDocuments = async (sourceDoc, targetDocs) => {
  try {
    if (!sourceDoc || !Array.isArray(targetDocs)) {
      throw new Error('Invalid document format');
    }
    
    const results = targetDocs.map(targetDoc => {
      
      console.log("Comparing documents:", {
        source: sourceDoc.wordFrequency,
        target: targetDoc.wordFrequency
      });
      
      const similarity = cosineSimilarity(sourceDoc, targetDoc);
      console.log(`Similarity: ${similarity}`);
      
      return {
        documentId: targetDoc._id,
        originalName: targetDoc.originalName,
        similarity,
        score: Math.round(similarity * 100),
      };
    });

    return results.sort((a, b) => b.similarity - a.similarity);
  } catch (error) {a
    console.error('Error in matchDocuments:', error);
    throw new Error(`Error matching documents: ${error.message}`);
  }
};