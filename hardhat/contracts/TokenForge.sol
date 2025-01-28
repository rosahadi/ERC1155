// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ITokenCollection} from "./ITokenCollection.sol";

contract TokenForge is Ownable {
    ITokenCollection public tokenContract;

    error InvalidForgeToken();
    error TokenContractNotSet();

    constructor() Ownable(msg.sender) {}

    function setTokenContract(address tokenContractAddress) public onlyOwner {
        tokenContract = ITokenCollection(tokenContractAddress);
    }

    function forge(uint256 targetTokenId) public {
        if (address(tokenContract) == address(0)) revert TokenContractNotSet();
        if (targetTokenId < 3 || targetTokenId > 6) revert InvalidForgeToken();

        if (targetTokenId == 3) {
            tokenContract.burn(msg.sender, 0, 1);
            tokenContract.burn(msg.sender, 1, 1);
        } else if (targetTokenId == 4) {
            tokenContract.burn(msg.sender, 1, 1);
            tokenContract.burn(msg.sender, 2, 1);
        } else if (targetTokenId == 5) {
            tokenContract.burn(msg.sender, 0, 1);
            tokenContract.burn(msg.sender, 2, 1);
        } else if (targetTokenId == 6) {
            tokenContract.burn(msg.sender, 0, 1);
            tokenContract.burn(msg.sender, 1, 1);
            tokenContract.burn(msg.sender, 2, 1);
        }

        tokenContract.forgeMint(targetTokenId, 1);
    }
}
