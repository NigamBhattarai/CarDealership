import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight as right } from "@fortawesome/free-solid-svg-icons";
import "./home.scss";
import axios from "axios";
import Loader from "../common/loader";

function NewArrivals() {
  const [newArrival, setNewArrival] = useState();
  var input = "";
  useEffect(() => {
    axios
      .get("http://localhost:3000/car/new-arrival")
      .then((res) => {
        setNewArrival(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [input]);

  const isNewArrivalDefined = () => {
    return newArrival !== undefined;
  };
  return isNewArrivalDefined() ? (
    <React.Fragment>
      <Container fluid className="newArrivalsRow">
        <Container className="newArrivalItem">
          <span className="newArrivalsTitle">New Arrival</span>
          <Row>
            <Col md="8">
              <img
                src={"http://localhost:3000"+newArrival.images[0]}
                alt="New Arrival"
                width="100%"
              />
            </Col>
            <Col md="4" className="newArrivalsDescDiv">
              <Link to={"/car/" + newArrival._id} className="newArrivalName">
                {newArrival.name}
              </Link>
              <div className="newArrivalDesc">
                <Row className="mb-5">
                  {newArrival.desc.substring(0, 300)}...
                </Row>
                <Link to={"/car/" + newArrival._id} className="newArrivalLink">
                  View More <FontAwesomeIcon icon={right} />
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  ) : (
    <Loader active={true} />
  );
}
export default NewArrivals;
