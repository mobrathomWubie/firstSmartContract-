// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ArtNFTWithRoyalties is ERC721URIStorage, Ownable, IERC2981 {
    using ECDSA for bytes32;

    uint256 private _nextTokenId;

    mapping(uint256 => address) private _creators;
    mapping(uint256 => uint256) private _royalties;

    constructor() ERC721("MBW", "ARTBrand") {}

    /// @notice Traditional minting
    function mintNFT(address to, string memory uri, uint256 royalty) public onlyOwner returns (uint256) {
        require(royalty <= 10000, "Royalty must be <= 100% (10000 basis points)");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        _creators[tokenId] = to;
        _royalties[tokenId] = royalty;

        return tokenId;
    }

    /// @notice Lazy minting with signed voucher
    function redeem(
        address recipient,
        string memory uri,
        uint256 royalty,
        bytes memory signature
    ) public returns (uint256) {
        require(royalty <= 10000, "Royalty too high");

        bytes32 message = keccak256(abi.encodePacked(recipient, uri, royalty));
        bytes32 ethSignedMessage = ECDSA.toEthSignedMessageHash(message);
        address signer = ECDSA.recover(ethSignedMessage, signature);

        require(signer == owner(), "Invalid signature");

        uint256 tokenId = _nextTokenId++;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, uri);

        _creators[tokenId] = recipient;
        _royalties[tokenId] = royalty;

        return tokenId;
    }

    /// @notice Royalty logic for marketplaces
    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view override returns (address, uint256) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        uint256 royalty = (_royalties[tokenId] * salePrice) / 10000;
        return (_creators[tokenId], royalty);
    }

    /// @notice Token URI override
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /// @notice Support ERC interfaces
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, IERC165)
        returns (bool)
    {
        return interfaceId == type(IERC2981).interfaceId 
            || super.supportsInterface(interfaceId);
    }
}