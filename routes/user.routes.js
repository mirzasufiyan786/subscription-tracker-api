import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id",authorize, getUser);

userRouter.post("/",(req,res)=> res.send({title:"Create a new user"}));

userRouter.put("/:id",(req,res)=> res.send({title:"update a user with id"}));

userRouter.get("/:id",(req,res)=> res.send({title:"delete a user with id"}))

export default userRouter;