import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { MetaMaskProvider } from "metamask-react";

require("dotenv").config({ debug: true });

ReactDOM.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <MoralisProvider
        appId="tFMrhTbhCjALTwdhpoqVNPiVk1pbvTldHw9rqZar"
        serverUrl="https://2gr3ntn4ke7p.usemoralis.com:2053/server"
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MoralisProvider>
    </MetaMaskProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
