import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useNFTBalances, useMoralis, useMoralisWeb3Api } from "react-moralis";

import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Admin from "./pages/Admin";
import NFT from "./pages/NFT";
import "./App.css";
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
  allUsersNFTs: [],
  setAllUsersNFTs: () => {},
  allNFTsByContract: [],
  setAllNFTsByContract: () => {},
  nftEventHistory: [],
  contractAddress: "",
});

const App = () => {
  const [nft, setNft] = useState(null);
  const { data: NFTBalances } = useNFTBalances();
  const { Moralis } = useMoralis();
  const [contractAddress] = useState(
    "0x43b92b42ee33fC01f4d9A3249E478F7bc0cFCC0c"
  );
  const Web3Api = useMoralisWeb3Api();
  const [allUsersNFTs, setAllUsersNFTs] = useState([]);
  const [allNFTsByContract, setAllNFTsByContract] = useState([]);

  // Grabs all of this user's V_AUTH NFTs, sets to global state
  useEffect(() => {
    const vAuthNfts =
      NFTBalances &&
      NFTBalances.result.filter((nft) => {
        return nft.token_address === contractAddress.toLowerCase();
      });
    setAllUsersNFTs(vAuthNfts);
  }, [NFTBalances, setAllUsersNFTs, contractAddress]);

  useEffect(() => {
    Moralis.start({
      serverUrl: "https://02brmz1pkwey.usemoralis.com:2053/server",
      appId: "50crjfrjaWvtkLtyWA5Sw50Dopm00aaeqD4J5p8G",
    });
    const fetchAllTokensForContract = async () => {
      //Get metadata for one token. Ex: USDT token on ETH
      const options = {
        chain: "rinkeby",
        address: "0x43b92b42ee33fC01f4d9A3249E478F7bc0cFCC0c".toLowerCase(),
      };
      const allTokens = await Web3Api.token.getAllTokenIds(options);
      console.log("allTokens.result", allTokens.result);
      setAllNFTsByContract(allTokens.result);
    };
    fetchAllTokensForContract();
  }, [Moralis, Web3Api.token]);

  const value = {
    nft,
    setNft,
    setAllUsersNFTs,
    allUsersNFTs,
    contractAddress,
    setAllNFTsByContract,
    allNFTsByContract,
  };

  return (
    <AppContext.Provider value={value}>
      <Layout>
        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route index path="/app" element={<Home />} />
          <Route path="app/admin" element={<Admin />} />
          <Route path="app/nfts" element={<NFTList />} />
          <Route path="app/nfts/:nftId" element={<NFT />} />
          <Route path="app/nfts/:nftId/transfer" element={<Transfer />} />

          <Route path="app/wallet" element={<Wallet />} />
          <Route path="app/scan" element={<ClaimOwnership />} />
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
