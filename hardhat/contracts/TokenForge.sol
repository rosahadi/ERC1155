// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ITokenCollection} from "./ITokenCollection.sol";

contract TokenForge is Ownable {
    ITokenCollection public tokenContract; 

    error InvalidForgeToken();
    error TokenContractNotSet();
    error InsufficientBalance();

    constructor(address tokenContractAddress) Ownable(msg.sender) {
        tokenContract = ITokenCollection(tokenContractAddress);
    }
    function forge(uint256 targetTokenId) public {
        if (address(tokenContract) == address(0)) revert TokenContractNotSet();
        if (targetTokenId < 3 || targetTokenId > 6) revert InvalidForgeToken();

        uint256[] memory ids;
        uint256[] memory amounts;

        if (targetTokenId == 3) {
            if (
                tokenContract.balanceOf(msg.sender, 0) < 1 ||
                tokenContract.balanceOf(msg.sender, 1) < 1
            ) {
                revert InsufficientBalance();
            }
            ids = new uint256[](2);
            amounts = new uint256[](2);
            ids[0] = 0;
            ids[1] = 1;
            amounts[0] = 1;
            amounts[1] = 1;
        } else if (targetTokenId == 4) {
            if (
                tokenContract.balanceOf(msg.sender, 1) < 1 ||
                tokenContract.balanceOf(msg.sender, 2) < 1
            ) {
                revert InsufficientBalance();
            }
            ids = new uint256[](2);
            amounts = new uint256[](2);
            ids[0] = 1;
            ids[1] = 2;
            amounts[0] = 1;
            amounts[1] = 1;
        } else if (targetTokenId == 5) {
            if (
                tokenContract.balanceOf(msg.sender, 0) < 1 ||
                tokenContract.balanceOf(msg.sender, 2) < 1
            ) {
                revert InsufficientBalance();
            }
            ids = new uint256[](2);
            amounts = new uint256[](2);
            ids[0] = 0;
            ids[1] = 2;
            amounts[0] = 1;
            amounts[1] = 1;
        } else if (targetTokenId == 6) {
            if (
                tokenContract.balanceOf(msg.sender, 0) < 1 ||
                tokenContract.balanceOf(msg.sender, 1) < 1 ||
                tokenContract.balanceOf(msg.sender, 2) < 1
            ) {
                revert InsufficientBalance();
            }
            ids = new uint256[](3);
            amounts = new uint256[](3);
            ids[0] = 0;
            ids[1] = 1;
            ids[2] = 2;
            amounts[0] = 1;
            amounts[1] = 1;
            amounts[2] = 1;
        }

        tokenContract.burnBatch(msg.sender, ids, amounts);
        tokenContract.forgeMint(targetTokenId, 1);
    }
}
