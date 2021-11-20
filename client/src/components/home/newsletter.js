import React from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { positions, useAlert } from "react-alert";

function NewsLetter() {
  const alert = useAlert();
  const submitNewsLetter = (e) => {
    e.preventDefault();
    alert.show("Thank you for subscribing to our newsletter. You'll get every update.", {position: positions.MIDDLE});
  };
  return (
    <Container className="newsletter">
      <Row>
        <Form.Text className="text-muted">
          Subscribe to our Newsletter
        </Form.Text>
      </Row>
      <Form onSubmit={(e) => submitNewsLetter(e)}>
        <Row>
          <Col md="11" sm="10" xs="10" style={{ paddingRight: "0px" }}>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="newsletterInput border-0"
            ></Form.Control>
          </Col>
          <Col md="1" sm="2" xs="2" style={{ paddingLeft: "0px" }}>
            <Button className="newsletterButton border-0" type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
export default NewsLetter;
