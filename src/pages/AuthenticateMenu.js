import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Row, Col } from "antd";
import { useMoralis } from "react-moralis";
import Header from "../components/Header";

const AuthenticateMenu = () => {
  const { authenticate, isAuthenticated, logout, account } = useMoralis();

  const login = async () => {
    console.log(isAuthenticated, account);
    if (!isAuthenticated || !account) {
      await authenticate({ provider: "walletconnect" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("Logged Out");
  };

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>Welcome to V_AUTH !!</h1>
              <Typography>{account}</Typography>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              {account && (
                <Link to="/claim-ownership" className="categories">
                  <Button type="primary" className="button">
                    Claim Ownership
                  </Button>
                </Link>
              )}
            </Col>
            <Col span="24" align="middle">
              <Button type="primary" className="button" onClick={login}>
                Connect Your Wallet
              </Button>
            </Col>

            <Col span="24" align="middle">
              <Button type="primary" onClick={logOut}>
                Disconnect Your Wallet
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AuthenticateMenu;
