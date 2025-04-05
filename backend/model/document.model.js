import { Schema } from "mongoose";
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    contentText: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    wordFrequency: { type: Map, of: Number }
  });


  const Document = mongoose.model('Document', documentSchema);

  export default Document;