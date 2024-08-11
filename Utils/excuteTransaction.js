import { ethers } from "ethers";
import dotenv from "dotenv";
import schedule from "node-schedule";
import {
  getUserTransaction,
  updateUserTransaction,
} from "../Transaction/utils.js";
import mongoose from "mongoose";
import { connectMongoose } from "../database/Connect/index.js";

dotenv.config();
const privateKey = process.env.PRIVATE_KEY;

const executeTransaction = async (chainId, to, value, data) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    to: to,
    value: value,
    data: data,
    chainId: chainId,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    "http://localhost:3000/transaction/execute-transaction",
    requestOptions
  ).catch((error) => console.error("error", error));
  const text = await response.text();
  console.log({ result: JSON.parse(text) });
  return JSON.parse(text);
};

export const startTransactionEventLoop = async (id, time) => {
  const date = new Date(time || "2024-08-11T12:10:40.000+5:30");
  const job = schedule.scheduleJob(date, async () => {
    connectMongoose();
    const txData = await getUserTransaction(id);
    const { chainId, to, value, data, isExecute } = txData;
    console.log({ txData });
    if (!isExecute) {
      const { tx } = await executeTransaction(chainId, to, value, data);
      if (tx) {
        await updateUserTransaction(id, tx);
      }
    }
  });
};
