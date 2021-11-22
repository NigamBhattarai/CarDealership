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
          <div
            className="d-block w-100 carouselImage"
            style={{background:"url(http://localhost:3000"+value.images[0]+") center center / 100% no-repeat"}}
          ></div>
          <Carousel.Caption style={{backgroundColor:"rgba(0,0,0,0.6)",width:"100%",left:0,bottom:0,paddingBottom:"50px"}}>
            <h3>{value.name}</h3>
            <p>{value.desc.substring(0, 200)}{(value.desc.length>200)&&"..."}</p>
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
