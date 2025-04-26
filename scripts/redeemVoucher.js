const hre = require("hardhat");
const { ethers } = hre;
require("dotenv").config();

// ✅ Replace with actual voucher data from createVoucher.js
const voucher = {
  recipient: "0x4b0f985B87531B7793b6bAC9843877966bc75C9E", // ✅ Your testnet address
  uri: "ipfs://QmUSiM4bo5ScT5WKAYeT1GhCiPSsSEeuXuUyQ4bJU4rtyu", // ✅ Your metadata CID
  royalty: 1000, // ✅ 10% royalty in basis points
  signature: "0x3b692c75ac845644836a149f9e28f76fcda429c769b0e07f14144763c9c62eea19d23dbdedbae8a5fd36ec2dbc9165195845f4aeca4372178bf2a87fdc1323c41b" // ⛔ Replace this with the actual signature from createVoucher.js
};

async function main() {
  const [caller] = await ethers.getSigners(); // Account calling redeem (can be owner or buyer)

  const contractAddress = "0x255aF98876f24D1B6B53cA05B594A23b76975e17"; // ✅ Your deployed Sepolia contract
  const ArtNFTWithRoyalties = await ethers.getContractFactory("ArtNFTWithRoyalties");
  const artNFT = await ArtNFTWithRoyalties.attach(contractAddress);

  console.log("🔁 Redeeming NFT for:", voucher.recipient);
  
  // Pass each parameter individually instead of the whole object
  const tx = await artNFT.redeem(
    voucher.recipient,
    voucher.uri,
    voucher.royalty,
    voucher.signature
  );
  
  const receipt = await tx.wait();

  console.log("✅ NFT redeemed successfully!");
  console.log("📦 Transaction Hash:", receipt.hash);
}

main().catch((error) => {
  console.error("❌ Redeem failed:", error);
  process.exitCode = 1;
});