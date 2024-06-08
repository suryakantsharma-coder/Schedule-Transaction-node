import express from "express";
const router = express.Router();

// body parser code
import bodyParser from "body-parser";
import { createNewUser } from "./utils.js";
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/register", async (req, res) => {
    try {
        const {email,username, password} = req.body;
        const response = await createNewUser(username, email, password);
        if (response === "Email and password are required") 
        res.status(500).send(response);
        else 
        res.send("New user created successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }

    
});

export default router;