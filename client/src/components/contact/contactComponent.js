import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { Card, Container, Form, Button } from "react-bootstrap";
import UseTitle from "../../hooks/useTitle";
import Footer from "../common/footer";
import Header from "../common/header";
import "./contact.scss";

function ContactComponent() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const alert = useAlert();
  const bindText = (e) => {
    if (e.target === document.getElementById("email")) {
      setEmail(e.target.value);
    } else if (e.target === document.getElementById("message")) {
      setMessage(e.target.value);
    }
  };
  const submitContactForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/message/add", { email, message })
      .then((res) => {
        alert.show("Message submitted. Please wait for our response, Thank you.");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.log("Failure");
      });
  };
  UseTitle("Contact Us | Cars Cobra");
  return (
    <div>
      <Header />
      <Container>
        <Card className="contactCard">
          <Card.Title>Contact Us</Card.Title>
          <hr />
          <Card.Body>
            <Form onSubmit={(e) => submitContactForm(e)}>
              <Form.Control
                id="email"
                value={email}
                onChange={(e) => {
                  bindText(e);
                }}
                type="email"
                placeholder="Your email"
              />
              <Form.Control
                id="message"
                value={message}
                onChange={(e) => {
                  bindText(e);
                }}
                as="textarea"
                placeholder="Your Message"
                rows={3}
              />
              <Button
                type="submit"
                className="defaultButton contactSubmitButton"
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default ContactComponent;
