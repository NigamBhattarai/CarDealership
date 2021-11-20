import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareRight as right } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../common/loader";

var background = (image) => {
  const style = {
    background: "url(" + image + ")",
    backgroundColor: "black",
    height: "250px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto 100%",
    backgroundPosition: "center center",
  };
  return style;
};

function PopularCars() {
  const [popularCars, setPopularCars] = useState();
  var input = "";
  useEffect(() => {
    axios
      .get("http://localhost:3000/car/popular")
      .then((res) => {
        setPopularCars(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [input]);

  const isPopularCarsDefined = () => {
    return popularCars !== undefined;
  };

  function showPopularCars() {
    var items = [];
    popularCars.forEach((value, index, array) => {
      items.push(
        <Col
          key={index}
          xl="3"
          lg="6"
          md="6"
          sm="6"
          xs="12"
          className="popularItem"
          style={background("http://localhost:3000"+value.images[0])}
        >
          <img
            src="/images/cobra-logo.png"
            width="30"
            height="30"
            className="popularDescIcon"
            alt="Popular car"
          />
          <div className="popularDesc">
            <img
              src="/images/cobra-logo.png"
              width="30"
              height="30"
              className="popularDescIcon"
              alt="Popular car"
            />
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
    return items;
  }
  return isPopularCarsDefined() ? (
    <React.Fragment>
      <Container fluid>
        <Row>{showPopularCars()}</Row>
      </Container>
    </React.Fragment>
  ) : (
    <Loader active={true} />
  );
}
export default PopularCars;
