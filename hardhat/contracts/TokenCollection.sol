// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Burnable} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenCollection is ERC1155, Ownable, ERC1155Burnable, ReentrancyGuard {
    using Strings for uint256;

    string public name;
    string public symbol;
    address public forgeContract;

    uint256 public constant COOLDOWN = 1 minutes;
    mapping(address => mapping(uint256 => uint256)) public lastMintTime;
    mapping(uint256 => uint256) public totalSupply;

    // Custom errors
    error NameNotSet();
    error SymbolNotSet();
    error InvalidTokenId();
    error CooldownNotFinished();
    error TokenNotMinted();
    error InvalidTradeTokens();
    error InsufficientBalance();
    error UnauthorizedForge();
    error InvalidAddress();

    constructor()
        ERC1155(
            "ipfs://bafybeie5ecok52umnm4ohgbmi6grr2tmpkvlkildoqxt22o7jxcla6logu/"
        )
        Ownable(msg.sender)
    {}

    function setCollectionInfo(
        string memory _name,
        string memory _symbol
    ) public onlyOwner {
        name = _name;
        symbol = _symbol;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function uri(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (totalSupply[tokenId] == 0) revert TokenNotMinted();

        return
            string.concat(
                super.uri(tokenId),
                Strings.toString(tokenId),
                ".json"
            );
    }

    function mint(uint256 tokenId) public {
        if (bytes(name).length == 0) revert NameNotSet();
        if (bytes(symbol).length == 0) revert SymbolNotSet();
        if (tokenId > 2) revert InvalidTokenId();
        if (block.timestamp < lastMintTime[msg.sender][tokenId] + COOLDOWN) {
            revert CooldownNotFinished();
        }

        lastMintTime[msg.sender][tokenId] = block.timestamp;
        totalSupply[tokenId] += 1;
        _mint(msg.sender, tokenId, 1, "");
    }

    function forgeMint(uint256 tokenId, uint256 amount) external {
        if (msg.sender != forgeContract) revert UnauthorizedForge();

        totalSupply[tokenId] += amount;
        _mint(tx.origin, tokenId, amount, "");
    }

    function trade(
        uint256 tokenToGive,
        uint256 tokenToReceive,
        uint256 amount
    ) public nonReentrant {
        if (tokenToGive > 2 || tokenToReceive > 2) revert InvalidTradeTokens();
        if (balanceOf(msg.sender, tokenToGive) < amount) {
            revert InsufficientBalance();
        }

        totalSupply[tokenToGive] -= amount;
        totalSupply[tokenToReceive] += amount;

        _burn(msg.sender, tokenToGive, amount);
        _mint(msg.sender, tokenToReceive, amount, "");
    }

    function setForgeContract(address _forgeContract) external onlyOwner {
        if (_forgeContract == address(0)) revert InvalidAddress();
        forgeContract = _forgeContract;
    }
}
