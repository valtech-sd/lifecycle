import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useNFTBalances } from "react-moralis";

import Home from "./pages/Home";
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
  allVAuthNfts: [],
  nftEventHistory: [],
  setAllVAuthNfts: () => {},
  contractAddress: "",
});

const App = () => {
  const [nft, setNft] = useState(null);
  const { data: NFTBalances } = useNFTBalances();
  const [contractAddress] = useState(
    "0x43b92b42ee33fC01f4d9A3249E478F7bc0cFCC0c"
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
