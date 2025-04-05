import User from '../model/user.model.js';
import CreditRequest from '../model/CreditRequest.model.js';
import mongoose from 'mongoose';


export const requestCredits = async (req, res) => {
  try {
    const { requestedCredits, reason } = req.body;

    if (!requestedCredits || requestedCredits <= 0) {
      return res.status(400).json({ message: 'Invalid credit amount requested' });
    }

    const creditRequest = await CreditRequest.create({
      userId: req.user._id,
      requestedCredits,
      reason: reason || 'No reason provided',
    });

    res.status(201).json({
      message: 'Credit request submitted successfully',
      requestId: creditRequest._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserCreditRequests = async (req, res) => {
  try {
    const requests = await CreditRequest.find({ userId: req.user._id }).sort({ requestDate: -1 });

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPendingCreditRequests = async (req, res) => {
  try {
    const requests = await CreditRequest.find({ status: 'pending' })
      .populate('userId', 'name email')
      .sort({ requestDate: 1 });
    console.log(requests);
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const processCreditRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    if (!requestId) {
      return res.status(400).json({ message: 'Request ID is required' });
    }

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be either "approved" or "rejected"' });
    }

    const creditRequest = await CreditRequest.findById(requestId);
    if (!creditRequest) {
      return res.status(404).json({ message: 'Credit request not found' });
    }

    if (creditRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Update credit request status
      creditRequest.status = status;
      creditRequest.processedBy = req.user._id;
      creditRequest.processedDate = new Date();
      await creditRequest.save({ session });

      if (status === 'approved') {
        // Update user credits using findByIdAndUpdate
        const updatedUser = await User.findByIdAndUpdate(
          creditRequest.userId,
          { $inc: { credits: creditRequest.requestedCredits } },
          { new: true, session }
        );

        if (!updatedUser) {
          throw new Error('User not found');
        }
      }

      // Commit the transaction
      await session.commitTransaction();

      res.status(200).json({
        message: `Credit request ${status} successfully`,
        requestId: creditRequest._id,
      });
    } catch (error) {
      // If an error occurred, abort the transaction
      await session.abortTransaction();
      throw error;
    } finally {
      // End the session
      session.endSession();
    }
  } catch (error) {
    console.error('Error processing credit request:', error);
    res.status(500).json({ 
      message: 'Error processing credit request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};