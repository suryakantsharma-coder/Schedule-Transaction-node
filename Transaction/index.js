import express from "express";
const router = express.Router();

// body parser code
import bodyParser from "body-parser";
import { createNewTransction, getUserTransaction } from "./utils.js";
import { Timestamp } from "mongodb";
import { executeTransaction } from "../Utils/ethers.js";
import { startTransactionEventLoop } from "../Utils/excuteTransaction.js";
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/create-new-transaction", async (req, res) => {
  try {
    const { to, value, data, address, timestamp, chainId, scheduleTime } =
      req.body;
    const response = await createNewTransction(
      to,
      value,
      data,
      timestamp,
      address,
      chainId
    );

    startTransactionEventLoop(response?._id, scheduleTime);

    if (response === "invalid data") res.status(500).send({ response });
    else res.send(response?._id);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/fetch-user-transaction", async (req, res) => {
  try {
    const { id } = req.body;
    console.log({ body: req.body });
    const response = await getUserTransaction(id);
    console.log({ response });
    if (response === "id missing") res.status(500).send({ response });
    else res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/execute-transaction", async (req, res) => {
  try {
    const { chainId, to, value, data } = req.body;
    console.log({ body: req.body });
    const tx = await executeTransaction(chainId, to, value, data);
    if (tx) res.status(500).send({ tx });
    else res.send(tx);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
