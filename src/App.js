import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NFT from "./pages/NFT";
import "./App.css";
import PinInput from "./pages/PinInput";
import AuthenticateMenu from "./pages/AuthenticateMenu";
import ClaimOwnership from "./pages/ClaimOwnership";
import NFTList from "./pages/NFTList";

export const AppContext = React.createContext({
  nft: {
    id: null,
    owner: "",
  },
  setNft: () => {},
  allVAuthNfts: [],
  setAllVAuthNfts: () => {},
  contractAddress: "",
});

const App = () => {
  const [nft, setNft] = useState(null);
  const [allVAuthNfts, setAllVAuthNfts] = useState([]);
  const [contractAddress] = useState(
    "0xdFad5CDC3Bdef5EEf621C87847d61CC738320891"
  );
  const value = { nft, setNft, setAllVAuthNfts, allVAuthNfts, contractAddress };

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
