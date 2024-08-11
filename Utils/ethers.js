import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;

// create new account using ethers
export async function createNewAccountKey() {
  const wallet = ethers.Wallet.createRandom();
  console.log("privateKey", process.env.PRIVATE_KEY_PASSWORD);
  // encrypt private key
  const encryptedWallet = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD
  );
  // console.log("decryptedWallet", encryptedWallet);
  const decryptedWallet = await ethers.Wallet.fromEncryptedJsonSync(
    JSON.parse(
      `"{\\"address\\":\\"ca7d2301ddd6456c6f494bb5759a323089c88b07\\",\\"id\\":\\"9d768138-dabb-440d-bac1-786ddbe91d98\\",\\"version\\":3,\\"Crypto\\":{\\"cipher\\":\\"aes-128-ctr\\",\\"cipherparams\\":{\\"iv\\":\\"2df2725dfb10eac96a14adb216ab42fe\\"},\\"ciphertext\\":\\"8e1c1efa929c7585452c6556a20c62d7c385a59502a4c637a348d9fe06f67189\\",\\"kdf\\":\\"scrypt\\",\\"kdfparams\\":{\\"salt\\":\\"c9c8fff745a99bacc7940cff2b98d26138963a359a583b0f9bbbc3d06fb499df\\",\\"n\\":131072,\\"dklen\\":32,\\"p\\":1,\\"r\\":8},\\"mac\\":\\"fc130d87a97efade15965c82b779a303aec0caf6f96b82297d8beda0dee40575\\"},\\"x-ethers\\":{\\"client\\":\\"ethers/6.13.0\\",\\"gethFilename\\":\\"UTC--2024-06-11T17-15-22.0Z--ca7d2301ddd6456c6f494bb5759a323089c88b07\\",\\"path\\":\\"m/44'/60'/0'/0/0\\",\\"locale\\":\\"en\\",\\"mnemonicCounter\\":\\"3be8b173fceeba51e8542c6fe925673d\\",\\"mnemonicCiphertext\\":\\"ef302ab4be05f15a0c3d42f7aa5a6238\\",\\"version\\":\\"0.1\\"}}"`
    ),
    process.env.PRIVATE_KEY_PASSWORD
  );
  console.log("decryptedWallet", decryptedWallet.privateKey);

  return {
    address: wallet?.address,
    encryptedKey: JSON?.stringify(encryptedWallet),
  };
}

const getProvider = (chainId) => {
  switch (chainId) {
    case 80002:
      return new ethers.JsonRpcProvider("https://rpc-amoy.polygon.technology");
  }
};

const getSigner = (provider) => {
  return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
};

const getExplorerLink = (chainId, hash) => {
  switch (chainId) {
    case 80002:
      return "https://amoy.polygonscan.com/tx/" + hash;
  }
};

export async function executeTransaction(chainId, to, value, data) {
  try {
    const provider = getProvider(chainId);
    const signer = getSigner(provider);
    console.log({ signer: await signer.getAddress() });
    const { hash } = await signer.sendTransaction({
      to,
      value,
      data,
    });
    console.log(hash);
    console.log(getExplorerLink(chainId, hash));
    return getExplorerLink(chainId, hash);
  } catch (err) {
    console.log(err);
  }
}
