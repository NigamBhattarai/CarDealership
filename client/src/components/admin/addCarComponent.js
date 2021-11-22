import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { useLocation, Navigate } from "react-router";
import Footer from "../common/footer";
import Header from "../common/header";
import Loader from "../common/loader";
import "./addcarcomponent.scss";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

var tempImages = [];

function AddCarComponent() {
  //Constants
  const alert = useAlert();
  const [loggedIn] = useState(
    cookies.get("accessToken") !== undefined ? true : false
  );
  const id = useQuery().get("id");
  const initialCarState = {
    name: "",
    desc: "",
    arrivalDate: "",
    inStock: "",
    featured: false,
    images: [],
    imageFiles: [],
  };
  const [isUpdate] = useState(id ? true : false);
  const [carDetails, setCarDetails] = useState(initialCarState);
  const [isValidId, setIsValidId] = useState(true);

  //Callbacks
  useEffect(() => {
    if (isUpdate) {
      axios
        .get("http://localhost:3000/car?id=" + id)
        .then((res) => {
          const d = new Date(res.data.arrivalDate);
          let formatted_date =
            d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
          setCarDetails({
            ...res.data,
            imageFiles: [],
            arrivalDate: formatted_date,
          });
        })
        .catch((err) => {
          console.error(err);
          setIsValidId(false);
        });
    }
    // eslint-disable-next-line
  }, []);

  //Functions
  const hasCarLoaded = () => {
    if (isUpdate) return carDetails !== initialCarState;
    else return true;
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    if (loggedIn) {
      var formData = {
        name: carDetails.name,
        desc: carDetails.desc,
        arrivalDate: carDetails.arrivalDate,
        inStock: carDetails.inStock,
        featured: carDetails.featured,
        images: carDetails.images,
        imageFiles: carDetails.imageFiles,
      };
      isUpdate && (formData._id = carDetails._id);
      axios
        .post(
          "http://localhost:3000/admin/car/" + (isUpdate ? "update" : "add"),
          formData,
          {
            headers: {
              Authorization: "Bearer " + cookies.get("accessToken"),
            },
          }
        )
        .then((res) => {
          alert.show("Data "+(isUpdate?"udated!":"added!"))
          if(!isUpdate)setCarDetails(initialCarState);
        })
        .catch((err) => {
          alert.show("Couldn't "+(isUpdate?"udate ":"add ")+" data due to internal error. Try again!")
        });
    }
  };
  const bindText = (e) => {
    if (e.target === document.getElementById("carName")) {
      setCarDetails({ ...carDetails, name: e.target.value });
    } else if (e.target === document.getElementById("carDescription")) {
      setCarDetails({ ...carDetails, desc: e.target.value });
    } else if (e.target === document.getElementById("carArrivalDate")) {
      setCarDetails({ ...carDetails, arrivalDate: e.target.value });
    } else if (e.target === document.getElementById("carInStock")) {
      setCarDetails({ ...carDetails, inStock: e.target.value });
    } else if (e.target === document.getElementById("carIsFeatured")) {
      setCarDetails({ ...carDetails, featured: e.target.checked });
    }
  };

  const bindImage = (e) => {
    var images = carDetails.images;
    var imageFiles = [];
    tempImages.forEach((value, i, array) => {
      const index = images.indexOf(value);
      if (index > -1) {
        images.splice(index, 1);
      }
    });
    for (var i = 0; i < e.target.files.length; i++) {
      imageFiles.push(e.target.files[i]);
      tempImages.push(URL.createObjectURL(e.target.files[i]));
      images.push(URL.createObjectURL(e.target.files[i]));
    }
    setCarDetails({ ...carDetails, images: images, imageFiles: imageFiles });
  };

  const showImages = () => {
    var items = [];
    carDetails.images.forEach((value, index, array) => {
      items.push(
        <Col key={index} xs={3} xxl={3} className="otherImagesItem">
          <img
            src={
              value.split("http://localhost:8080")[1]
                ? value
                : "http://localhost:3000" + value
            }
            className="img-responsive img-fluid"
            alt={"Image-" + index}
          />
        </Col>
      );
    });
    return items;
  };

  return loggedIn ? (
    (hasCarLoaded() && isValidId) || (hasCarLoaded() && !isValidId) ? (
      <>
        <Header />
        <Container>
          <Row className="addCarFormRow">
            <Col xs={12} xxl={8} className="addCarCol">
              <Card className="addCarCard">
                {isValidId ? (
                  <>
                    <Card.Header>{isUpdate ? "Update" : "Add"} Car</Card.Header>
                    <Card.Body>
                      <Form
                        onSubmit={(e) => {
                          submitLoginForm(e);
                        }}
                      >
                        <FormControl
                          onChange={(e) => bindText(e)}
                          value={carDetails.name}
                          type="text"
                          placeholder="Name"
                          id="carName"
                        />
                        <FormControl
                          onChange={(e) => bindText(e)}
                          value={carDetails.desc}
                          as="textarea"
                          placeholder="Description"
                          rows="4"
                          id="carDescription"
                        />
                        <Form.Label>Arrival Date</Form.Label>
                        <FormControl
                          type="date"
                          value={carDetails.arrivalDate}
                          onChange={(e) => bindText(e)}
                          id="carArrivalDate"
                        />
                        <Form.Control
                          type="number"
                          value={carDetails.inStock}
                          onChange={(e) => bindText(e)}
                          placeholder="Number of cars"
                          id="carInStock"
                        />
                        <Form.Check
                          type="checkbox"
                          id={`carIsFeatured`}
                          label={`Featured`}
                          onChange={(e) => bindText(e)}
                          checked={carDetails.featured}
                        />
                        <Form.Control
                          type="file"
                          onChange={(e) => bindImage(e)}
                          id="imagesInput"
                          multiple
                        />
                        <Form.Label>Selected Images</Form.Label>
                        <Row>{showImages()}</Row>
                        <Row>
                          <Button type="submit" className="defaultButton">
                            {isUpdate ? "Update" : "Add"}
                          </Button>
                        </Row>
                      </Form>
                    </Card.Body>
                  </>
                ) : (
                  <>
                    <Container className="text-center text-danger font-large">
                      Invalid data provided, Try checking the url.
                    </Container>
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    ) : (
      <Loader active={true} />
    )
  ) : (
    <Navigate to="/" />
  );
}

export default AddCarComponent;
