import { PageHeader } from "antd";
import { Link } from "react-router-dom";
import "./Header.css";
import Valtech from "../images/original.png";

const Header = () => {
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        extra={[
          <>
            <Link to="/" className="categories">
              <img src={Valtech} className="logo" alt="logo"></img>
            </Link>
            <Link to="/admin" className="categories">
              Admin
            </Link>
            <Link to="/nfts" className="categories">
              All NFTs
            </Link>
            <Link to="#" className="categories">
              ID #
            </Link>
          </>,
        ]}
      ></PageHeader>
    </div>
  );
};

export default Header;
