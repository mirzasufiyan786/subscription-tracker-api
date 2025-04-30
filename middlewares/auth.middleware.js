import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.userid);

    if (!req.user) {
      return res.status(401).json({ error: "Access denied. User not found." });
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

export default authorize;
