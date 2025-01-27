// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { ERC1155Burnable } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";

contract TokenCollection is ERC1155, Ownable, ERC1155Burnable {
    using Strings for uint256;

    string public name;
    string public symbol;
    address public forgeContract;

    uint256 public constant COOLDOWN = 1 minutes;
    mapping(address => mapping(uint256 => uint256)) public lastMintTime;
    mapping(uint256 => uint256) public totalSupply;

    constructor() ERC1155("ipfs://QmegtECd22aA6oLqqTRbrHL8hMwckS48rjL2bDNZdqH6CX/") Ownable(msg.sender) {}

    function setCollectionInfo(string memory _name, string memory _symbol) public onlyOwner {
        name = _name;
        symbol = _symbol;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        require(totalSupply[tokenId] > 0, "URI: Token not minted yet");
        return string(abi.encodePacked(super.uri(tokenId), Strings.toString(tokenId), ".json"));
    }

    function mint(uint256 tokenId) public {
        require(bytes(name).length > 0, "Collection name is not set");
        require(bytes(symbol).length > 0, "Collection symbol is not set");
        require(tokenId <= 2, "Can only mint tokens 0-2");
        require(
            block.timestamp >= lastMintTime[msg.sender][tokenId] + COOLDOWN,
            "You must wait until the cooldown period has finished."
        );

        lastMintTime[msg.sender][tokenId] = block.timestamp;
        totalSupply[tokenId] += 1;
        _mint(msg.sender, tokenId, 1, "");
    }

    function forgeMint(uint256 tokenId, uint256 amount) external {
        totalSupply[tokenId] += amount;
        _mint(tx.origin, tokenId, amount, "");
    }

    function trade(uint256 tokenToGive, uint256 tokenToReceive, uint256 amount) public {
        require(tokenToGive <= 2 && tokenToReceive <= 2, "Only tokens 0, 1, and 2 can be traded.");
        require(balanceOf(msg.sender, tokenToGive) >= amount, "Insufficient balance to trade.");

        _burn(msg.sender, tokenToGive, amount);
        _mint(msg.sender, tokenToReceive, amount, "");
    }
}
