import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { MetaMaskProvider } from "metamask-react";

require("dotenv").config({ debug: true });

ReactDOM.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <MoralisProvider
        appId="50crjfrjaWvtkLtyWA5Sw50Dopm00aaeqD4J5p8G"
        serverUrl="https://02brmz1pkwey.usemoralis.com:2053/server"
      >
        <HashRouter>
          <App />
        </HashRouter>
      </MoralisProvider>
    </MetaMaskProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
