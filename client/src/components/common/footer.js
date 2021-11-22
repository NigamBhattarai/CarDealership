import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./footer.scss";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Footer = () => {
  const [loggedIn, setLoggedIn] = useState(
    cookies.get("accessToken") !== undefined ? true : false
  );
  const logout = () => {
    cookies.remove("accessToken", {path:"*"});
    setLoggedIn(false);
  };
  return (
    <footer className="page-footer font-small blue pt-4">
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col md="6" className="mt-md-0 mt-3">
            <h5 className="text-uppercase">Cars Cobra</h5>
            <p className="mx-5 px-5">
              Be part of Cars cobra. Subscribe to our newsletter and get updates
              on our new and exclusive arrivals. Cars nowhere to be found in the
              city, come and visit our dealership, you'll not leave.
            </p>
          </Col>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Important Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="footerLink" to="/about">
                  About us
                </Link>
              </li>
              <li>
                <Link className="footerLink" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="footerLink" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="footerLink" to="/arrivals">
                  Arrivals
                </Link>
              </li>
              <li>
                <Link
                  className="footerLink"
                  to={loggedIn ? "/admin/add" : "/admin/login"}
                >
                  {loggedIn ? "Admin Panel" : "Admin Login"}
                </Link>
              </li>
              {loggedIn ? (
                <li>
                  <a
                    href="#logout"
                    className="footerLink"
                    onClick={(e) => {
                      logout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Our Branches</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="footerLink" to="#!">
                  Damauli
                </Link>
              </li>
              <li>
                <Link className="footerLink" to="#!">
                  Kathmandu
                </Link>
              </li>
              <li>
                <Link className="footerLink" to="#!">
                  Biratnagar
                </Link>
              </li>
              <li>
                <Link className="footerLink" to="#!">
                  Pokhara
                </Link>
              </li>
            </ul>
          </div>
        </Row>
      </Container>

      <div className="footer-copyright text-center py-3">
        © 2021-2022 Copyright:
        <a className="footerLink" href={window.location.href}>
          CarsCobra.com
        </a>
      </div>
    </footer>
  );
};
export default Footer;
