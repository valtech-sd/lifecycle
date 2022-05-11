import 'antd/dist/antd.css';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Row, Col, Steps, Button } from 'antd';

import Logo from '../assets/valtechLogo-black.png';
import useIntersection from '../hooks/useOnScreen';
import FS from '../assets/Vector.svg';
import tryAppImg from '../assets/img.png';
import Phones from '../assets/img(1).png';
import ValtechLogo from '../assets/valtechLogo_2.png';
import DemoAppOverview from '../assets/demo-app-overview.mp4';
import DemoAppTransfer from '../assets/demo-app-transfer.mp4';
import DemoViewEtherscan from '../assets/demo-view-etherscan.mp4';
import VectorFS from '../assets/Vector.png';

const { Step } = Steps;

const Container = styled.div`
  display: flex;
`;

const Column = styled(Col)`
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: ${({ placeItems }) => (placeItems ? placeItems : 'center')};

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 50px 0;
  }

  @media (min-width: 992px) {
    height: 100vh;
  }
`;

const Sidebar = styled.div`
  min-width: 300px;
  height: 100vh;
  position: sticky;
  top: 0;
  border-right: 1px solid #cfcfcf;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div`
  padding: 50px;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: lighter;
  padding: 0 50px;

  @media (max-width: 768px) {
    padding: 0 25px;
  }
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: lighter;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0px')};
  color: ${({ color }) => (color ? color : 'black')};
  padding: 0 50px;

  @media (max-width: 768px) {
    padding: 0 25px;
  }
`;

const Header = styled.h1`
  font-size: 50px;
  margin-bottom: 0;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-family: ${({ cursive }) => (cursive ? 'Betterworks' : 'Futura Std')};
  transform: ${({ cursive }) => (cursive ? 'rotate(-11.33deg);' : 'none')};
  color: ${({ color }) => (color ? color : '#000000')};
  margin-top: ${({ cursive, bold, marginTop }) => (cursive || bold || marginTop ? '-20px' : '0')};
  position: ${({ position }) => (position ? position : 'static')};
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 'auto')};

  @media (max-width: 768px) {
    font-size: 45px;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 5px;
  background: black;
  color: white;
  width: 230px;
  height: 50px;
  text-transform: uppercase;
  box-shadow: 5px 5px #76f8b0;
  border: black;
  display: flex;
  place-content: center;
  place-items: center;

  :active,
  :focus {
    background: black !important;
    color: white !important;
    box-shadow: 5px 5px #76f8b0 !important;
  }
`;

const Image = styled.img`
  width: ${({ width }) => width};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Video = styled.video`
  width: ${({ width }) => (width ? width : '')};
  margin-top: 50px;
  padding: 0 20px;

  @media (max-width: 576px) {
    width: 90%;
  }
`;

const items = [
  {
    title: 'Background',
    section: 'background',
  },
  {
    title: 'Try out the App',
    section: 'tryApp',
  },
  {
    title: 'Product Info / Transaction History',
    section: 'productInfo',
  },
  {
    title: 'Transfer your NFT',
    section: 'transfer',
  },
  {
    title: 'Explore the Blockchain',
    section: 'explore',
  },
];

const Box = styled(Row)`
  background-color: ${({ color }) => (color ? color : 'white')};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0 !important;

  @media (max-width: 992px) {
    justify-content: space-evenly;
    padding: 50px 0;
  }
`;

const Section = ({ children, id, setActive, color, gutter, image }) => {
  const ref = useRef(null);
  const inViewport = useIntersection(ref);

  if (inViewport) {
    setActive(ref.current.id);
  }

  return (
    <Box ref={ref} id={id} color={color} gutter={gutter} image={image}>
      {children}
    </Box>
  );
};

const Item = ({ item, active }) => {
  const ItemWrapper = styled.div`
    height: 100px;
    display: flex;
    place-items: center;
    background-color: ${active ? '#F2F2F2' : 'white'};
    padding-left: 20px;
    text-transform: uppercase;

    &:hover {
      cursor: pointer;
    }
  `;

  const handleClick = (hash) => {
    window.scrollTo({
      behavior: 'smooth',
      top: document.getElementById(hash).offsetTop,
    });
  };

  return (
    <ItemWrapper onClick={() => handleClick(item.section)}>
      <p>{item.title}</p>
    </ItemWrapper>
  );
};

const steps = [
  {
    title: 'Request an NFT',
    description:
      'Email (max.mcgee@valtech.com) with your Ethereum account address, full name, and company name',
  },
  {
    title: 'Install MetaMask app on iOS or Android',
    description: () => (
      <StyledButton href="https://metamask.io/download" target="_blank">
        Download Metamask
      </StyledButton>
    ),
  },
  {
    title: 'Open the App from the MetaMask Browser',
    description: () => (
      <StyledButton href="/#/app" target="_blank">
        Link to App
      </StyledButton>
    ),
  },
  {
    title: 'View, Transfer, and Share your NFT',
    description: 'Interact with the NFT for your items digital twin',
  },
];

const LandingPage = () => {
  const [active, setActive] = useState('');
  // console.log({ active });

  return (
    <Container>
      <Sidebar>
        <ImageWrapper>
          <img src={Logo} alt="Valtech Logo" width="200px" />
        </ImageWrapper>
        {items.map((item, index) => {
          return <Item key={index} item={item} active={item.section === active} />;
        })}
      </Sidebar>
      <Content>
        <Section setActive={setActive} id={items[0].section} color="#76F8B0">
          <Column lg={12}>
            <Header>Lifecycle:</Header>
            <Header bold position zIndex={1}>
              Ownership
            </Header>
            <Header cursive position zIndex={0} color="#fff">
              Reimangined
            </Header>
            <img src={FS} alt="FS" width="225px" />
          </Column>
          <Column lg={12} placeItems="start">
            <Title>Background</Title>
            <Text>
              Lifecycle connects the digital and physical ownership through blockchain technology.
              Physical luxury items are minted as NFTs on the Ethereum blockchain. The NFT serves as
              a digital certificate of ownership of the physical product.
            </Text>
            <Text>
              Blockchain technology helps brands build trust, ensure high standards for authenticity
              and ownership traceability of luxury goods. Once a Digital Certificate of Ownership is
              recorded on the blockchain, it is available for any third-party to verify as the
              product changes ownership throughout its life.
            </Text>
          </Column>
        </Section>
        <Section setActive={setActive} id={items[1].section} color="#F5F5F5">
          <Column lg={12}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Header>Try out</Header>
              <Header>
                the <strong>App</strong>
              </Header>
            </div>
            <Image src={tryAppImg} alt="Try the App" width="350px" />
          </Column>
          <Column lg={12}>
            <div style={{ marginTop: 50 }}>
              <Steps progressDot current={4} direction="vertical">
                {steps.map((step, index) => (
                  <Step
                    key={index}
                    title={step.title}
                    description={
                      typeof step.description === 'function' ? step.description() : step.description
                    }
                  />
                ))}
              </Steps>
            </div>
          </Column>
        </Section>
        <Section setActive={setActive} id={items[2].section}>
          <Column lg={12}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Header>View Product</Header>
              <Header bold>
                Info <span style={{ fontWeight: 'normal' }}> and</span>
              </Header>
              <Header marginTop>Transaction</Header>
              <Header bold> History</Header>
            </div>
            <Text marginTop="50px">
              This demo shows how to use the Lifecycle app to view a product's transaction history.
              This includes various steps in a product's journey, such as a transfer of ownership,
              certified repair, or any custom event.
            </Text>
          </Column>
          <Column lg={12}>
            <Video controls>
              <source src={DemoAppOverview} type="video/mp4" />
            </Video>
          </Column>
        </Section>
        <Section setActive={setActive} id={items[3].section} color="#F5F5F5">
          <Column lg={12}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Header>Transfer</Header>
              <Header marginTop>
                your <strong>NFT</strong>
              </Header>
            </div>
            <Text>
              This demo shows the process of transferring a Digital Certificate of Ownership (NFT)
              to a different Ethereum account. Any valid ETH address can receive the NFT from your
              account.
            </Text>
            <Image src={Phones} alt="VFS Phones" width="500px" />
          </Column>
          <Column lg={12}>
            <Video controls>
              <source src={DemoAppTransfer} type="video/mp4" />
            </Video>
          </Column>
        </Section>
        <Section setActive={setActive} id={items[4].section} color="#000" image={VectorFS}>
          <Column lg={12}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Header color="#fff">Explore the</Header>
              <Header bold color="#fff">
                Blockchain
              </Header>
            </div>
            <Text color="#fff">
              Etherscan is the largest blockchain exploration tool available for free to the public.
              This demo shows how the website can be used to view important information about the
              NFT, such as current token holders, the smart contract, and event logs.
            </Text>
            <img src={ValtechLogo} alt="Valtech Logo" width="225px" />
          </Column>
          <Column lg={12}>
            <Video controls width="100%">
              <source src={DemoViewEtherscan} type="video/mp4" />
            </Video>
          </Column>
        </Section>
      </Content>
    </Container>
  );
};

export default LandingPage;
