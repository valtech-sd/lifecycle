import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Row, Col } from "antd";
import { useMoralis } from "react-moralis";
import Header from "../components/Header";
import "./Home.css";

const Home = () => {
  const { logout, account } = useMoralis();

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
              <Link to="/input-pin" className="categories">
                <Button type="primary" className="button">
                  New User
                </Button>
              </Link>
            </Col>

            <Col span="24" align="middle">
              <Button type="primary" onClick={logOut}>
                Existing User
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;
