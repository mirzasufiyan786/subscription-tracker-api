import { Router } from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getUserSubscriptions,
  cancelSubscription,
  getUpcomingRenewals
} from "../controllers/subscription.controller.js";

import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscriptions);
subscriptionRouter.get("/:id", getSubscriptionById);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", updateSubscription);
subscriptionRouter.delete("/:id", deleteSubscription);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.get("/:id/cancel", cancelSubscription);
subscriptionRouter.get("/upcoming-renewals", getUpcomingRenewals);

export default subscriptionRouter;
