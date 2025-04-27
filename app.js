import express from "express";

const app = express();

import {PORT} from "./config/env.js"

app.get("/",(req , res)=>{
    res.send("Welcome to Subscription Tracker API!")
})

app.listen(PORT, ()=> console.log(`Subscription starting at http://localhost:${PORT}`))

export default app;