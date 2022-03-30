import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
