import React, { useState } from "react";
import { Navigate } from "react-router";
import Header from "../common/header";
import Footer from "../common/footer";
import "./login.scss";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Login() {
  const [loggedIn, setLoggedIn] = useState(
    cookies.get("accessToken") !== undefined ? true : false
  );
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const submitLoginForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/admin/login", {
        username: loginDetails.username,
        password: loginDetails.password,
      })
      .then((res) => {
        cookies.set("accessToken", res.data.accessToken,{path:"*",expires: new Date(Date.now()+2592000)});
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const bindText = (e) => {
    if (e.target === document.getElementById("username")) {
      setLoginDetails({
        username: e.target.value,
        password: loginDetails.password,
      });
    } else if (e.target === document.getElementById("password")) {
      setLoginDetails({
        password: e.target.value,
        username: loginDetails.username,
      });
    }
  };

  return !loggedIn ? (
    <>
      <Header />
      <Container>
        <Row className="loginFormRow">
          <Col xs={12} md={8} xxl={5} className="loginCol">
            <Card className="loginCard">
              <Card.Header>Login</Card.Header>
              <Card.Body>
                <Form
                  onSubmit={(e) => {
                    submitLoginForm(e);
                  }}
                >
                  <FormControl
                    value={loginDetails.username}
                    onChange={(e) => bindText(e)}
                    type="text"
                    placeholder="Username"
                    id="username"
                  />
                  <FormControl
                    value={loginDetails.password}
                    onChange={(e) => bindText(e)}
                    type="password"
                    placeholder="Password"
                    id="password"
                  />
                  <Row>
                    <Button type="submit" className="defaultButton">
                      Login
                    </Button>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  ) : (
    <Navigate to="/" />
  );
}

export default Login;
