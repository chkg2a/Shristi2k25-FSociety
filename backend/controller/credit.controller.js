import User from '../model/user.model.js';
import CreditRequest from '../model/CreditRequest.model.js';


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
    console.log(req.body);
    if (!['approved', 'rejected'].includes(status)) {
        console.log("hitted");
      return res.status(400).json({ message: 'Invalid status' });
    }

    const creditRequest = await CreditRequest.findById(requestId);
    if (!creditRequest) {
      return res.status(404).json({ message: 'Credit request not found' });
    }

    if (creditRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }

    creditRequest.status = status;
    creditRequest.processedBy = req.user._id;
    creditRequest.processedDate = new Date();
    await creditRequest.save();

    if (status === 'approved') {
      const user = await User.findById(creditRequest.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.credits += creditRequest.requestedCredits;
      await user.save();
    }

    res.status(200).json({
      message: `Credit request ${status}`,
      requestId: creditRequest._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};