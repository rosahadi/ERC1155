# CoolCats NFT Collection

CoolCats is an interactive NFT collection where users can mint, trade, and forge unique cat tokens. The project consists of two parts: a Hardhat-based smart contract project and a Next.js frontend application.

## 🔗 Project Link

[https://erc-1155-ten.vercel.app/](https://erc-1155-ten.vercel.app/)

## Features

- Mint free base cat tokens
- Forge premium cat tokens by combining base tokens
- 1-minute cooldown between free mints

## 📂 Project Structure

├── hardhat/ # Smart contract project
└── nextjs/ # Frontend application

---

## Smart Contracts (Hardhat)

### Prerequisites

- 📌 Node.js (v20 or higher)
- 📌 npm
- 📌 Ethereum wallet with some Sepolia ETH for deployment

### Installation

```bash
cd hardhat
npm install

```

### Available Scripts

`npm run deploy` - Deploy contracts to Sepolia network
`npm run verify` - Verify contract on Etherscan
`npm run prettier` - Format Solidity code
`npm run solhint` - Run Solidity linter
`npm run slither` - Run Slither analyzer
`npm run coverage` - Generate test coverage report
`npm run interact` - Run interaction script

## Frontend (Next.js)

### Prerequisites

- 📌 Node.js (v20 or higher)
- 📌 pnpm

### Installation

```bash
cd nextjs
npm install

```

---

## Key Dependencies

### Frontend:

🏗 @reown/appkit
🔗 wagmi
🎨 tailwindcss
🎬 framer-motion

### Smart Contracts:

🔒 @openzeppelin/contracts
🔨 hardhat
🔗 ethers
