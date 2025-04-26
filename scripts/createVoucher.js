require("dotenv").config();
const { ethers } = require("ethers");

const signer = new ethers.Wallet(process.env.PRIVATE_KEY);

const recipientAddress = "0x4b0f985B87531B7793b6bAC9843877966bc75C9E";
const tokenUri = "ipfs://QmUSiM4bo5ScT5WKAYeT1GhCiPSsSEeuXuUyQ4bJU4rtyu";
const royalty = 1000;

async function createVoucher(recipient, uri, royalty) {
  const hash = ethers.solidityPackedKeccak256(
    ["address", "string", "uint256"],
    [recipient, uri, royalty]
  );

  const signature = await signer.signMessage(ethers.getBytes(hash));

  const voucher = {
    recipient,
    uri,
    royalty,
    signature,
  };

  console.log("🎟️ Generated Lazy Minting Voucher:\n");
  console.log(JSON.stringify(voucher, null, 2));
}

createVoucher(recipientAddress, tokenUri, royalty);
