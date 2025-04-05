
const cosineSimilarity = (doc1, doc2) => {
    const freq1 = new Map(Object.entries(doc1.wordFrequency));
    const freq2 = new Map(Object.entries(doc2.wordFrequency));
  
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
  
    return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
  };
  
  
  export const matchDocuments = async (sourceDoc, targetDocs) => {
    try {
      const results = targetDocs.map(targetDoc => {
        const similarity = cosineSimilarity(sourceDoc, targetDoc);
  
        return {
          documentId: targetDoc._id,
          originalName: targetDoc.originalName,
          similarity,
          score: Math.round(similarity * 100),
        };
      });
  
      return results.sort((a, b) => b.similarity - a.similarity);
    } catch (error) {
      throw new Error(`Error matching documents: ${error.message}`);
    }
  };
  