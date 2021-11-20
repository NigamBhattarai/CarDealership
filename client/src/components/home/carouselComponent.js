import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../common/loader";
import "./home.scss";

function CarouselComponent() {
  const [featuredCars, setFeaturedCars] = useState();
  var input = "";
  useEffect(() => {
    axios
      .get("http://localhost:3000/car/featured")
      .then((res) => {
        setFeaturedCars(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [input]);
  const isFeaturedCarsDefined = () => {
    return featuredCars !== undefined;
  };
  const loadCarouselItems = () => {
    var items = [];
    featuredCars.forEach((value, index, array) => {
      items.push(
        <Carousel.Item as={Link} to={"car/"+value._id} key={index}>
          <img
            className="d-block w-100 carouselImage"
            src={"http://localhost:3000"+value.images[0]}
            alt="First slide"
          />
          <Carousel.Caption style={{backgroundColor:"rgba(0,0,0,0.6)"}}>
            <h3>{value.name}</h3>
            <p>{value.desc.substring(0, 200)}...</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });
    return items;
  };
  return isFeaturedCarsDefined() ? (
    <React.Fragment>
      <Carousel>{loadCarouselItems()}</Carousel>
    </React.Fragment>
  ) : (
    <Loader active={true} />
  );
}
export default CarouselComponent;
