import React, { createContext, useCallback, useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import UseTitle from "../../hooks/useTitle";
import Footer from "../common/footer";
import Header from "../common/header";
import "./carcomponent.scss";
import { useAlert } from "react-alert";
import axios from "axios";
import Loader from "../common/loader";
import ImageGallery from "react-image-gallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as close } from "@fortawesome/free-solid-svg-icons";

const CarContext = createContext();

function CarComponent() {
  //CONSTANTS
  const alert = useAlert();
  const { id } = useParams();

  //STATES
  const [booked, setBooked] = useState(false);
  const [bookedId, setBookedId] = useState("");
  const [copied, setCopied] = useState(false);
  const [car, setCar] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  var [initCar] = useState();
  const [galleryIsOpen, setGalleryIsOpen] = useState(false);
  var images = [];

  //FUNCTIONS
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      setGalleryIsOpen(false);
    }
  });

  const copyToClipboard = (text) => {
    if (booked) {
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };
  const bookCar = () => {
    if (!booked) {
      axios
        .post("http://localhost:3000/booking/add", { carid: id })
        .then((res) => {
          // console.log(res.data.doc._id)
          setBookedId(res.data.doc._id);
          setBooked(true);
          // console.log(res.data);
        })
        .catch((error) => {
          console.log("Failure");
        });
    } else {
      alert.show(
        'This car is already booked for you with id, "' + bookedId + '"'
      );
    }
  };

  const isCarDefined = useCallback(() => {
    return car !== undefined;
  }, [car]);

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };

  const showAllImages = () => {
    var items = [];
    car.images.forEach((value, index, array) => {
      items.push(
        <Col
          key={index}
          xs={3}
          xxl={3}
          className="otherImagesItem"
          onMouseOver={(e) => selectImage(index)}
          onClick={(e)=>setGalleryIsOpen(true)}
        >
          <img
            src={"http://localhost:3000" + value}
            className="img-responsive img-fluid"
            alt={"Image-" + index}
          />
        </Col>
      );
    });
    return items;
  };

  //Callbacks
  useEffect(() => {
    if (booked)
      alert.show('Your car is booked with id: "' + bookedId + '" Copy this id');
  }, [alert, bookedId, booked]);

  useEffect(() => {
    if (copied) alert.show("ID copied !");
  }, [copied, alert]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/car?id=" + id)
      .then((res) => {
        setCar(res.data);
      })
      .catch((error) => {
        console.log("Failure");
      });
  }, [initCar, id]);

  useEffect(() => {
    if (isCarDefined()) {
      car.images.forEach((value, index, array) => {
        images.push({
          original: "http://localhost:3000" + value,
          thumbnail: "http://localhost:3000" + value,
        });
      });
    }
  });

  UseTitle(isCarDefined() ? car.name + " | Cars Cobra" : "Cars Cobra");

  return isCarDefined() ? (
    galleryIsOpen ? (
      <Container fluid>
        <Row className="closeBtnRow">
          <Col
            xs={1}
            xxl={1}
            icon={close}
            className="closeBtn"
            onClick={(e) => {
              setGalleryIsOpen(false);
            }}
          >
            <FontAwesomeIcon icon={close}/>
          </Col>
        </Row>
        <ImageGallery items={images} startIndex={selectedImageIndex} />
      </Container>
    ) : (
      <CarContext.Provider value={{}}>
        <Header />
        <Container className="carDetailsContainer">
          <Row>
            <Col md="5" className="my-auto">
              <Row
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  setGalleryIsOpen(true);
                }}
              >
                <img
                  src={"http://localhost:3000" + car.images[selectedImageIndex]}
                  alt="Car"
                  className="carImage img-responsive img-fluid"
                />
              </Row>
              <Row className="my-3">{showAllImages()}</Row>
            </Col>
            <Col md="7" className="carInfoDiv">
              <Link to="/" className="carName">
                {car.name}
              </Link>
              <div className="carDesc">
                <Row className="mb-5">{car.desc}</Row>
                <Button
                  type="submit"
                  className="bookNowButton border-0"
                  onClick={(e) => bookCar()}
                >
                  Book Now
                </Button>

                {booked && (
                  <div
                    className="text-success font-small mt-4"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => copyToClipboard(bookedId)}
                  >
                    ID: {bookedId} (Click to Copy)
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </CarContext.Provider>
    )
  ) : (
    <Loader active={true} />
  );
}

export default CarComponent;
