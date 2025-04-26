const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ArtNFTWithRoyalties", function () {
  let ArtNFTWithRoyalties, artNFT, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    ArtNFTWithRoyalties = await ethers.getContractFactory("ArtNFTWithRoyalties");
    artNFT = await ArtNFTWithRoyalties.deploy();
    await artNFT.waitForDeployment();
  });

  it("Should mint an NFT with royalty", async function () {
    const tokenURI = "ipfs://QmeUyg6wx4U4Xc4Q7j62L3af17FAm39kUdyN99wPxDrZjp";
    const royalty = 1000; // 10%
    
    await artNFT.mintNFT(addr1.address, tokenURI, royalty);
    expect(await artNFT.ownerOf(0)).to.equal(addr1.address);
    
    const [receiver, royaltyAmount] = await artNFT.royaltyInfo(0, ethers.parseEther("1"));
    expect(receiver).to.equal(addr1.address);
    expect(royaltyAmount).to.equal(ethers.parseEther("0.1"));
  });
});