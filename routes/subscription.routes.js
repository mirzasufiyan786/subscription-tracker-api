import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/",(req,res)=> res.send({title:"GET all subscriptionRouter"}));

subscriptionRouter.get("/:id",(req,res)=> res.send({title:"GET subscription details"}));

subscriptionRouter.post("/",(req,res)=> res.send({title:"Create a new subscription"}));

subscriptionRouter.put("/:id",(req,res)=> res.send({title:"update a subscription with id"}));

subscriptionRouter.get("/:id",(req,res)=> res.send({title:"delete a subscription with id"}))

subscriptionRouter.get("/user/:id",(req,res)=> res.send({title:"GET all user subscription"}));

subscriptionRouter.get("/:id/cancel",(req,res)=> res.send({title:"cancel subscription"}));

subscriptionRouter.get("/upcoming-renewals",(req,res)=> res.send({title:"Get upcoming renewals"}));


export default subscriptionRouter;