import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useMoralis, useNFTBalances } from "react-moralis";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NFT from "./pages/NFT";
import "./App.css";
import PinInput from "./pages/PinInput";
import Transfer from "./pages/Transfer";
import AuthenticateMenu from "./pages/AuthenticateMenu";
import ClaimOwnership from "./pages/ClaimOwnership";
import Wallet from "./pages/Wallet";
import NFTList from "./pages/NFTList";
import Layout from "./components/Layout";

export const AppContext = React.createContext({
  nft: {
    id: null,
    owner: "",
  },
  setNft: () => {},
  allVAuthNfts: [],
  nftEventHistory: [],
  setAllVAuthNfts: () => {},
  contractAddress: "",
});

// const getNFTEventHistory = async (provider) => {
//   console.log("Alert: Fetching new historical transactions:", provider);
//   const web3Js = new Web3(provider);
//   const contract = require("./contractABIs/V_Authenticate.json");
//   const contractAddress = "0x9Ea4Bb6967936aA865963B43003b5bFa679C1AF3";
//   const nftContract = new web3Js.eth.Contract(contract.abi, contractAddress);
//   return await nftContract
//     .getPastEvents("allEvents", {
//       fromBlock: 0,
//       toBlock: "latest",
//     })
//     .then(function (events) {
//       const response = new Promise((resolve, reject) => {
//         events.forEach(async (event, index, array) => {
//           // if event is from "0x0", it was a mint event
//           if (
//             event.returnValues.from &&
//             event.returnValues.from.includes("0x0")
//           ) {
//             event.isMintEvent = true;
//           }
//           // Add timestamp to events
//           web3Js.eth.getBlock(event.blockNumber).then((block) => {
//             console.log("Adding timestamp to historical data");
//             event.timestamp = new Date(block.timestamp * 1000).toLocaleString();
//           });
//           if (index === array.length - 1) resolve();
//         });
//       });
//       return response.then(() => {
//         return events.filter((item) => {
//           return item.event === "Transfer";
//         });
//       });
//     });
// };

const App = () => {
  const { isWeb3Enabled, isAuthenticated, enableWeb3, authenticate, account } =
    useMoralis();
  const [nft, setNft] = useState(null);
  const { data: NFTBalances } = useNFTBalances();
  const [contractAddress] = useState(
    "0x9Ea4Bb6967936aA865963B43003b5bFa679C1AF3"
  );
  const [allVAuthNfts, setAllVAuthNfts] = useState([]);

  // Grabs all of this user's V_AUTH NFTs, sets to global state
  useEffect(() => {
    const vAuthNfts =
      NFTBalances &&
      NFTBalances.result.filter((nft) => {
        return nft.token_address === contractAddress.toLowerCase();
      });
    setAllVAuthNfts(vAuthNfts);
  }, [NFTBalances, setAllVAuthNfts, contractAddress]);

  const value = {
    nft,
    setNft,
    setAllVAuthNfts,
    allVAuthNfts,
    contractAddress,
  };

  return (
    <AppContext.Provider value={value}>
      <Layout>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="nfts" element={<NFTList />} />
          <Route path="nfts/:nftId" element={<NFT />} />
          <Route path="nfts/:nftId/transfer" element={<Transfer />} />

          <Route path="wallet" element={<Wallet />} />
          {/* Removed */}
          <Route path="authenticate-menu" element={<AuthenticateMenu />} />
          <Route path="claim-ownership" element={<ClaimOwnership />} />
          {/* Removed */}
        </Routes>
      </Layout>
      <Outlet />
    </AppContext.Provider>
  );
};

export default App;
