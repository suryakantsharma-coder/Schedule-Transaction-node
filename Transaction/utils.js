import { transactionModal } from "../database/Modals/storeTransaction.js";

export async function createNewTransction(
  to,
  value,
  data,
  timestamp,
  address,
  chainId
) {
  console.log({ to, value, data, timestamp, address, chainId });
  const isExecute = false;
  const txHash = "";
  if (to && value && data && timestamp && address && chainId) {
    const transactionSchema = await transactionModal.create({
      to,
      value,
      data,
      timestamp,
      address,
      chainId,
      isExecute,
      txHash,
    });
    return transactionSchema;
  } else {
    return "invalid data";
  }
}

export async function getUserTransaction(id) {
  console.log(id);
  if (id) {
    const transactions = await transactionModal.findOne({ _id: id });
    return transactions;
  } else {
    return "id missing";
  }
}

export async function updateUserTransaction(id, hash) {
  console.log(id);
  if (id) {
    const transactions = await transactionModal.updateOne(
      { _id: id },
      { $set: { txHash: hash, isExecute: true } }
    );
    return transactions;
  } else {
    return "id missing";
  }
}
