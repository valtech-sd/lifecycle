import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";
import { Carousel, Card } from "antd";
import Carousel1 from "../images/carousel1.png";
import Carousel2 from "../images/carousel2.png";
import Carousel3 from "../images/carousel3.png";
import Comics from "../images/comics.png";
import ArtemisFowl from "../images/ArtemisFowl.png";
import MobyDick from "../images/MobyDick.png";

const carousel = [Carousel1, Carousel2, Carousel3];

const Home = () => {
  return (
    <>
      <div className="container">
        <Header />
        <div className="section">
          <h1>Shop Merch</h1>
          <div className="cards">
            <Card className="card">
              <h1>Browse Shirts</h1>
              <img
                src={Comics}
                alt="Comics Category"
                className="card-content"
              ></img>
              <br />
              <Link to="/categories" state={"Comics"} className="link">
                Shop Now
              </Link>
            </Card>
            <Card className="card">
              <h1>Browse Pants</h1>
              <img
                src={ArtemisFowl}
                alt="Artemis Fowl"
                className="card-content"
              ></img>
              <br />
              <Link to="/categories" className="link">
                View Product
              </Link>
            </Card>
            <Card className="card">
              <h1>Browse Shoes</h1>
              <img
                src={MobyDick}
                alt="Moby Dick"
                className="card-content"
              ></img>
              <br />
              <Link to="/" className="link">
                View Product
              </Link>
            </Card>
          </div>
        </div>
        <div className="section">
          <h1>Shop NFTs</h1>
          <div className="cards">
            <Card className="card">
              <h1>Browse Shirts</h1>
              <img
                src={Comics}
                alt="Comics Category"
                className="card-content"
              ></img>
              <br />
              <Link to="/categories" state={"Comics"} className="link">
                Shop Now
              </Link>
            </Card>
            <Card className="card">
              <h1>Browse Pants</h1>
              <img
                src={ArtemisFowl}
                alt="Artemis Fowl"
                className="card-content"
              ></img>
              <br />
              <Link to="/categories" className="link">
                View Product
              </Link>
            </Card>
            <Card className="card">
              <h1>Browse Shoes</h1>
              <img
                src={MobyDick}
                alt="Moby Dick"
                className="card-content"
              ></img>
              <br />
              <Link to="/" className="link">
                View Product
              </Link>
            </Card>
          </div>
        </div>
        <Carousel autoplay className="carousel">
          {carousel.map((e) => {
            return <img src={e} className="carousel-img" alt="carousel"></img>;
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Home;
