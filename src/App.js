import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NFT from "./pages/NFT";
import "./App.css";
import PinInput from "./pages/PinInput";
import AuthenticateMenu from "./pages/AuthenticateMenu";
import ClaimOwnership from "./pages/ClaimOwnership";
import NFTList from "./pages/NFTList";
import { useMoralis } from "react-moralis";

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
//   const contractAddress = "0x3651624F81468bB5864B1ab3158907B070eE3600";
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
  const { isWeb3Enabled, isAuthenticated, enableWeb3 } = useMoralis();
  const [nft, setNft] = useState(null);
  const [allVAuthNfts, setAllVAuthNfts] = useState([]);
  const [contractAddress] = useState(
    "0x3651624F81468bB5864B1ab3158907B070eE3600"
  );

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect", chainId: 4 });
      console.log("web3 activated");
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  //https://itnext.io/when-you-finally-decided-to-rid-yourself-of-redux-8fff0624d2fb
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getNFTEventHistory(provider);
  //     console.log(
  //       "Alert: Data fetch complete. Number of transactions found for this smart contract:",
  //       data.length
  //     );
  //     setHistoryData(data);
  //   }
  //   if (provider) {
  //     // fetchData();
  //   }
  // }, [provider]);

  const value = {
    nft,
    setNft,
    setAllVAuthNfts,
    allVAuthNfts,
    contractAddress,
  };

  return (
    <AppContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="nfts" element={<NFTList />} />
        <Route path="nfts/:nftId" element={<NFT />} />
        <Route path="input-pin" element={<PinInput />} />
        <Route path="authenticate-menu" element={<AuthenticateMenu />} />
        <Route path="claim-ownership" element={<ClaimOwnership />} />
      </Routes>
      <Outlet />
    </AppContext.Provider>
  );
};

export default App;
