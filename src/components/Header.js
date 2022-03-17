import { PageHeader, Button, Input, Space, Badge } from "antd";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import "./Header.css";
import Valtech from "../images/original.png";
import USA from "../images/usa.png";
import { ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const { Search } = Input;
const categories = ["Shirts", "Pants", "Shoes"];

const Header = () => {
  const { authenticate, account } = useMoralis();

  const handleConnectToWallet = () => {
    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Delete connector
    });
  };

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        extra={[
          <>
            <Link to="/" className="categories">
              <img src={Valtech} className="logo"></img>
            </Link>

            <Button
              className="login"
              key="1"
              type="primary"
              onClick={() => handleConnectToWallet()}
            >
              {account ? (
                <span>{account.slice(0, 5)}...</span>
              ) : (
                <span>login</span>
              )}
            </Button>
          </>,
        ]}
      ></PageHeader>
    </div>
  );
};

export default Header;
