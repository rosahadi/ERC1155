// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface ITokenCollection is IERC1155 {
    function forgeMint(uint256 tokenId, uint256 amount) external;
    function burn(address account, uint256 id, uint256 amount) external;
    function canForge(uint256 targetTokenId, address forger) external view returns (bool);
}
