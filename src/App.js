import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NFT from "./pages/NFT";
import "./App.css";
import PinInput from "./pages/PinInput";
import AuthenticateMenu from "./pages/AuthenticateMenu";
import ClaimOwnership from "./pages/ClaimOwnership";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="admin" element={<Admin />} />
    <Route path="nft" element={<NFT />} />
    <Route path="input-pin" element={<PinInput />} />
    <Route path="authenticate-menu" element={<AuthenticateMenu />} />
    <Route path="claim-ownership" element={<ClaimOwnership />} />
  </Routes>
);

export default App;
