import React, { createContext, useEffect, useState } from "react";
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
  var [initCar] = useState();

  //FUNCTIONS

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
        // console.log(res.data);
      })
      .catch((error) => {
        console.log("Failure");
      });
  }, [initCar, id]);
  // console.log(car)
  const isCarDefined = () => {
    return car !== undefined;
  };

  UseTitle(isCarDefined() ? car.name + " | Cars Cobra":"Cars Cobra");

  return isCarDefined() ? (
    <CarContext.Provider value={{}}>
      <Header />
      <Container className="carDetailsContainer">
        <Row>
          <Col md="5" className="my-auto">
            <img
              src={"http://localhost:3000" + car.images[0]}
              alt="Car"
              className="carImage img-responsive img-fluid"
            />
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
  ) : (
    <Loader active={true} />
  );
}

export default CarComponent;
