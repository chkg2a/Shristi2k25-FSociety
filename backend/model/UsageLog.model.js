import mongoose from "mongoose";


const usageLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: { type: String, enum: ['scan', 'upload', 'download'], required: true },
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
    timestamp: { type: Date, default: Date.now }
  });


  const UsageLog = mongoose.model('UsageLog', usageLogSchema);

  export default UsageLog;