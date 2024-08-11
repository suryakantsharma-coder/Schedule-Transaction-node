import mongoose from "mongoose";

const transactionData = new mongoose.Schema({
  to: String,
  value: String,
  data: String,
  timeStamp: String,
  address: String,
  chainId: Number,
  isExecute: Boolean,
  txHash: String,
});

const transactionModal = mongoose.model("transaction", transactionData);

export { transactionModal };
