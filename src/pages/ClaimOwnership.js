import React, { useState, useEffect, useContext } from "react";
import { QrReader } from "react-qr-reader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { Row, Col, Typography } from "antd";
import Web3 from "web3";
import "dotenv/config";
import Header from "../components/Header";
import { StyledButton } from "./Wallet";
import { AppContext } from "../App.js";

const CryptoJS = require("crypto-js");

const QRWrapper = styled.div`
  border: ${({ isValid }) =>
    isValid ? "6px #00fea6 solid" : "6px #CC1455 solid"} !important;
  margin: auto;
  width: 320px;
  border-radius: 4px;

  @media (min-width: 768px) {
    width: 600px;
    height: 492px;
  }
`;

const ClaimOwnership = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Scan QR Code to Claim Ownership.");
  const { allUsersNFTs } = useContext(AppContext);
  const [isValid, setIsValid] = useState(false);
  const { account, enableWeb3, isWeb3Enabled } = useMoralis();

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    if (!isWeb3Enabled || !account) {
      console.log("ENABLING WEB3: Claim Ownership Page");
      enableWeb3();
    }
  }, [isWeb3Enabled, account, enableWeb3]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isDesktop = width > 768;

  // https://github.com/brix/crypto-js/issues/93
  const encryptWithAES = (text) => {
    return CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(text),
      process.env.REACT_APP_PASSPHRASE_AUTH
    ).toString();
  };

  const publickeys = [
    "53d468611cb88539428bc12ec0daf74b",
    "cd583bc51f247524aed7e4c748f8a2b4",
    "0edaf23c93035f182f5719f6df517ae5",
    "69b52ca7ce7d40594c999287aa31e855",
    "182a922c7fd54c782217bb1f689f3060",
  ];
  const encryptQRs = () => {
    return publickeys.map((key) => {
      return encryptWithAES(key);
    });
  };
  const qrCodes = encryptQRs();

  const codes = [
    "U2FsdGVkX1+0lj6hEQyRJ66kPnL3aukx7p6cs8Qzpi83FyLL/8P4knjF9BOYFW5Pjk2g6HUD0L/hC+Q6kdMWRg==",
    "U2FsdGVkX1/I3RbK3y4iBtQ4PRXXBqXHcIJRONYYD0EDOm2wA9ipZV8gDmi3tcUQ0f5uCgA5ObYFK4RBJ5l3sw==",
    "U2FsdGVkX1+OoajrkuHZqCDfW2v8z9k+2nFRedIbI87hAejQlYA/Vu9bjGRyl4j6HPUpFEybeiIiYAGlPir0cg==",
    "U2FsdGVkX18YBRyjEPGj1NVC2MixTeHnniJSF8vlebigYyObFVG8nSrZgNwaYJQQbZESeR0eDbpyHEe49MWJjQ==",
    "U2FsdGVkX1+puWS4ZRGKqfmamDOWmWN+i4KyHDN64GQppJbnVv2iObuhZwKJfsoc++91SH/tnIcF3DF51+7beA==",
  ];

  const decryptWithAES = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(
      ciphertext,
      process.env.REACT_APP_PASSPHRASE_AUTH
    );
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  const isOwnedByCurrentUser = (id) => {
    return allUsersNFTs.some((nft) => {
      return Number(nft.token_id) === id;
    });
  };

  return (
    <>
      <div className="container">
        <Header title="Claim Ownership" showWalletIcon={false} />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <QRWrapper isValid={isValid}>
                <QrReader
                  constraints={
                    isDesktop
                      ? undefined
                      : { facingMode: { exact: "environment" } }
                  }
                  videoStyle={{
                    height: "auto",
                    width: "auto",
                  }}
                  onResult={(result, error) => {
                    if (!!result) {
                      const dataQR = JSON.parse(result?.text);
                      setMessage("Successfully Scanned Item. Verifying now...");
                      const decryptedCode = decryptWithAES(dataQR.code);

                      if (
                        publickeys.includes(decryptedCode) &&
                        isOwnedByCurrentUser(dataQR.id)
                      ) {
                        setIsValid(true);
                        setMessage("Successfully claimed ownership!!");
                        setTimeout(() => {
                          navigate(`/app/nfts/${dataQR.id}`);
                        }, 3000);
                      } else {
                        setMessage(
                          "You do not own this product. Are you using the correct wallet account?"
                        );
                      }
                    }

                    if (!!error) {
                      // console.info(error);
                    }
                  }}
                  style={{ width: "100%" }}
                />
              </QRWrapper>
            </Col>

            <Col span="24" align="middle">
              <Typography
                style={{ fontSize: "1rem", fontWeight: 700, margin: "0 1rem" }}
              >
                {message}
              </Typography>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ClaimOwnership;
