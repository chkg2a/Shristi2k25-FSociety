import Document from "../model/document.model.js";
import User from "../model/user.model.js";
import UsageLog from "../model/UsageLog.model.js";
import { matchDocuments as matchWithCosine } from "../service/matchingService.js";

export const matchDocuments = async (req, res) => {
    try {
        const { sourceDocumentId } = req.body;

        if (!sourceDocumentId) {
            return res.status(400).json({ message: 'Source document ID is required' });
        }

        // Check if user has enough credits
        if (!req.user || req.user.credits <= 0) {
            return res.status(403).json({
                message: 'Insufficient credits. Please request more credits.',
            });
        }

        // Get source document
        const sourceDoc = await Document.findById(sourceDocumentId);
        if (!sourceDoc) {
            return res.status(404).json({ message: 'Source document not found' });
        }

        // Verify document ownership
        if (sourceDoc.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not have permission to access this document' });
        }

        // Get all other documents belonging to the user
        const targetDocs = await Document.find({ 
            _id: { $ne: sourceDocumentId },
            userId: req.user._id 
        });

        if (targetDocs.length === 0) {
            return res.status(404).json({ message: 'No other documents found for comparison' });
        }

        // Perform document matching
        const results = await matchWithCosine(sourceDoc, targetDocs);

        // Update user credits and stats using findByIdAndUpdate
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $inc: { 
                    credits: -1,
                    totalScans: 1
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('Failed to update user credits');
        }

        // Log the usage
        await UsageLog.create({
            userId: req.user._id,
            actionType: 'scan',
            documentId: sourceDocumentId,
        });

        res.status(200).json({
            message: 'Documents matched successfully',
            results,
            remainingCredits: updatedUser.credits,
        });
    } catch (error) {
        console.error('Document matching error:', error);
        res.status(500).json({ 
            message: 'Error matching documents',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};