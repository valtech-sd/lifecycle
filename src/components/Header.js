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
              <img src={Valtech} className="logo"></img>
            </Link>
          </>,
        ]}
      ></PageHeader>
    </div>
  );
};

export default Header;
