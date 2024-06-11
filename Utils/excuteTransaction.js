import { ethers } from "ethers"
import dotenv from "dotenv"
import schedule from "node-schedule"

dotenv.config()
const privateKey = process.env.PRIVATE_KEY





const sendTransaction = async () => {
    console.log("transaction starts")
    const transaction = {  
        to : "0xcA7D2301DDd6456c6F494bB5759A323089C88b07",
        value : ethers.parseEther("0.001")
    }

    const provider = new ethers.JsonRpcProvider("https://rpc-amoy.polygon.technology/");
    const signer = new ethers.Wallet(privateKey, provider);
    const tx = await signer.sendTransaction(transaction);
    const receipt = await provider.waitForTransaction(tx.hash);
    console.log(receipt);
}




const date = new Date("2024-06-11T12:23:00.000+5:30");

const job = schedule.scheduleJob(date, () => {
  console.log('The world is going to end today.');
  sendTransaction()
});



// function dateTimeToTimestamp(dateTimeString) {
//     const dateTime = new Date(dateTimeString);
//     if (isNaN(dateTime.getTime())) {
//         return null;
//     }
//     return dateTime.getTime();
// }

// const inputDateTime = "2024-06-11T12:00:00";
// const timestamp = dateTimeToTimestamp(inputDateTime);
// console.log("Unix timestamp:", (new Date().getTime() - timestamp), timestamp);



// setTimeout(() => {
//  sendTransaction();
// }, 300000)

console.log("time for one minute.")
let time = 0
const interval = setInterval(() => {
    console.log("time " + time);
    time += 1;
    if (time > 60) clearInterval(interval);
}, 1000)