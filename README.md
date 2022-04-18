## Background

Lifecycle is a web3-enabled DApp (Decentralized App) empowering brands to showcase their products on the Ethereum blockchain. Digital twins of physical luxury handbags are minted as Non-Fungible Tokens (NFTs). Lifecycle allows users to manage and transfer their NFTs, brands to keep a ledger of repairs, and other custom events throughout the product's lifecycle. This allows brands to create trust in an industry rife with counterfeit.

## Repository Organization

This repository consists of a [Create React App Rewired](https://github.com/timarney/react-app-rewired) front end, and a subdirectory, `nft-app-eth-3-31`, containing the NFT smart contract and associated functionality. Within `nft-app-eth-3-31/scripts`, one may deploy a new version of the smart contracts, mint and NFT, or repair and NFT. Currently, the only way to run these smart contract methods are on the CLI, or within Etherscan's [write/read interface](https://rinkeby.etherscan.io/token/0x43b92b42ee33fc01f4d9a3249e478f7bc0cfcc0c#readContract).

## Requirements

To interact with the DApp, one must have acess to a cryptocurrency wallet.

#### Development

1. Install the [Chrome MetaMask Extension](https://metamask.io/download/).
2. Once installed, select the Rinkeby Testnet in the MetaMask Extension.
3. Fund the wallet with test ETH. [This faucet](https://faucets.chain.link/rinkeby) allows easy funding of test ETH.
4. User activities such as authentication, NFT transfer trasactions prompts the MetaMask popup to complete the transaction on the blockchain.

#### Production

1. In production, the DApp must be accessed via the MetaMask native browser.
2. Make sure to have test ETH in the MetaMask wallet, and the Rinkeby Testnet selected.

Originally, WalletConnect [enabled deeplinks](https://docs.walletconnect.com/mobile-linking), allowing users to use the DApp in native browsers such as Chrome, Firefox, Safari. Right now, there is an active issue with MetaMask's Mobile App that is being monitored. Once MetaMask resolves [the issue](https://github.com/MetaMask/metamask-mobile/pull/3971) , our DApp should be accessible in native browsers, but for now the MetaMask browser must be used.

## Setup

#### Install Dependencies

```
npm i
```

#### Start Development Server

```
npm run start
```

## Deployment

1. Run `npm run build`
2. Copy all files and subdirectories of `/build` and paste into `/docs`, replacing the previous contents of `/docs` with the new build files.
3. In `/docs/index.html`, manually remove all references to `/lifecycle` (there should be 8 occurences in a file find/replace). Because of how the app is deployed via Github Pages, we need to remove the `/lifecycle` part of all relative paths in this file.
4. Commit and push to `main` branch.
5. Github Pages will automatically initiate a new deploy to https://lifecycle.valtech.engineering/

## Useful Resources

- [Our NFT Smart Contract on Etherscan](https://rinkeby.etherscan.io/address/0x43b92b42ee33fC01f4d9A3249E478F7bc0cFCC0c)
- [Moralis SDK](https://docs.moralis.io/introduction/readme#user) (used for much of the interaction with the blockchain)
- [Creating an NFT tutorial](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft) (used for this project)
- [Create React App Rewired](https://github.com/timarney/react-app-rewired)
