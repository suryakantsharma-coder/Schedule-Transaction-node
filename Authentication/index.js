import express from "express";
const router = express.Router();

// body parser code
import bodyParser from "body-parser";
import { createNewUser, getUserLogin } from "./utils.js";
import { createNewAccountKey } from "../Utils/ethers.js";
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/register", async (req, res) => {
    try {
        const {email,username, password} = req.body;
        const account = await createNewAccountKey();
        const response = await createNewUser(username, email, password, account?.address, account?.encryptedKey);
        console.log("response", response);
        if (response === "Email and password are required ") 
        res.status(500).send(response);
        else 
        res.send("New user created successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }

    
});

router.post("/access", async (req, res) => {
    try {
        const {email,password} = req.body;

        // create a find query in mogoose database
        const response = await getUserLogin( email, password);
        console.log("response", response);
        // if (response === "Email and password are required ") 
        // res.status(500).send(response);
        // else 
        res.send("New user created successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }

    
});


export default router;