import Subscription from '../models/subscription.model.js';

// Create Subscription
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });


    res.status(201).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

// Get All Subscriptions (admin/debugging)
export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};

// Get Subscription by ID
export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }
    res.status(200).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

// Update Subscription by ID
export const updateSubscription = async (req, res, next) => {
  try {
    const updated = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (e) {
    next(e);
  }
};

// Delete Subscription by ID
export const deleteSubscription = async (req, res, next) => {
  try {
    const deleted = await Subscription.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }
    res.status(200).json({ success: true, message: 'Subscription deleted' });
  } catch (e) {
    next(e);
  }
};

// Cancel Subscription (soft delete or set isActive=false)
export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    subscription.status = 'cancelled'; // or `isActive = false`
    await subscription.save();

    res.status(200).json({ success: true, message: 'Subscription cancelled' });
  } catch (e) {
    next(e);
  }
};

// Get Subscriptions of a User
export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({ success: false, message: 'You are not the owner of this account' });
    }

    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};

// Get Upcoming Renewals
export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const upcoming = await Subscription.find({
      renewalDate: { $gte: today, $lte: nextWeek },
      status: 'active',
    });

    res.status(200).json({ success: true, data: upcoming });
  } catch (e) {
    next(e);
  }
};
