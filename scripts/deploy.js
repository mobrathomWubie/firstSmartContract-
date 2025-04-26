const hre = require("hardhat");

async function main() {
  const ArtNFTWithRoyalties = await hre.ethers.getContractFactory("ArtNFTWithRoyalties");
  const artNFT = await ArtNFTWithRoyalties.deploy();
  
  await artNFT.waitForDeployment();
  console.log("Contract deployed to:", await artNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});