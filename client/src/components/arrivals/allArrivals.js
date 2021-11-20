import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCaretSquareRight as right } from "@fortawesome/free-solid-svg-icons";
import { AllArrivalsContext } from "./arrivals";
import CoverImage from "./coverImage";

var images = [];
for (var i = 1; i <= 25; i++) {
  images.push(
    "/images/popular" + Math.floor(Math.random() * (4 - 1) + 1) + ".jpg"
  );
}

var background = (image, height) => {
  const style = {
    background: "url(" + image + ")",
    backgroundColor: "#000000",
    height: height,
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto 100%",
    backgroundPosition: "center center",
  };
  return style;
};

function showPopularCars(allCars, setSelectedCar) {
  var items = [];
  if (allCars) {
    allCars.forEach((value, index, array) => {
      items.push(
        <Col
          key={value._id}
          id={value._id}
          xl="3"
          lg="6"
          md="6"
          sm="6"
          xs="12"
          className="popularItem"
          style={background("http://localhost:3000" + value.images[0], 250)}
          onMouseOver={(e) => {
            setSelectedCar(
              array.filter((el) => {
                return el._id === e.currentTarget.id;
              })[0]
            );
          }}
        >
          <img
            src="/images/cobra-logo.png"
            width="30"
            height="30"
            className="popularDescIcon"
            alt="Popular car"
          />
          <div className="popularDesc">
            {value.desc.substring(0, 200)}...
            <Button
              as={Link}
              to={"/car/" + value._id}
              className="viewMoreBtn"
              variant="dark"
            >
              View More <FontAwesomeIcon icon={right} />
            </Button>
          </div>
        </Col>
      );
    });
  }
  return items;
}

function AllArrivals() {
  const [{ setSelectedCar }, { allCars }] =
    useContext(AllArrivalsContext);
  return (
    <Container fluid>
      <CoverImage />
      <Row className="arrivalsListHeader">All Arrivals</Row>
      <Row className="arrivalsList">
        {showPopularCars(allCars, setSelectedCar)}
      </Row>
    </Container>
  );
}
export default AllArrivals;
