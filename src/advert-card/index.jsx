import React from "react";
import { plus } from "../assets/icons";
import Card from "react-bootstrap/Card";
import "./style.scss";

const Advert = () => {
  return (
    <Card className="advertisement-card">
      <Card.Img
        variant="top"
        src="https://i0.wp.com/gurgaonbakers.com/wp-content/uploads/2020/11/large-chocolaty-birthday-cake.jpg"
      />
      <Card.Body>
        <Card.Title>Monster Energy</Card.Title>
        <p className="weight">500 gm</p>
        <div className="price-container">
          <div>
            <span className="discounted-price">Rs 1599</span>
            <span className="price"><del>Rs 1299</del></span>
          </div>
          <img src={plus} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default Advert;
