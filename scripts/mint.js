const hre = require("hardhat");

async function main() {
  console.log("Starting mint process...");
  
  // 1. Get contract instance
  const contract = await hre.ethers.getContractAt(
    "ArtNFTWithRoyalties",
    "0x255aF98876f24D1B6B53cA05B594A23b76975e17" // ✅ updated for Sepolia
  );
  

  // 2. Get signer (default Hardhat account)
  const [owner] = await hre.ethers.getSigners();
  console.log("Using account:", owner.address);

  // 3. Mint NFT with simple try-catch
  try {
    console.log("Attempting to mint NFT...");
    const tx = await contract.mintNFT(
      owner.address,
      "ipfs://QmUSiM4bo5ScT5WKAYeT1GhCiPSsSEeuXuUyQ4bJU4rtyu",
      1000 // 10% royalty
    );
    const receipt = await tx.wait();
    console.log("✅ Mint transaction successful!");
    console.log("Transaction hash:", tx.hash);
    
    // 4. Basic verification
    console.log("\nVerification steps:");
    console.log("1. Run in console: npx hardhat console --network sepolia");
    console.log("2. Then run:");
    console.log(`
      const contract = await ethers.getContractAt(
        "ArtNFTWithRoyalties", 
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      );
      await contract.tokenURI(0); // Try token IDs 0, 1, 2...
    `);
  } catch (error) {
    console.error("❌ Minting failed:", error.message);
    console.log("\nTroubleshooting:");
    console.log("- Is contract deployed to the correct address?");
    console.log("- Is your Hardhat node running in another terminal?");
    console.log("- Are you using the correct mint function name and parameters?");
  }
}

main();