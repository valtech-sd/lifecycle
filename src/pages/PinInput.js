import React from "react";

import { Input, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

const { Search } = Input;

const PinInput = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <Header />

        <div className="section">
          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <h1>Welcome to V_AUTH !!</h1>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span="24" align="middle">
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Enter PIN"
                size="large"
                onSearch={() => {
                  navigate("/authenticate-menu");
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default PinInput;
