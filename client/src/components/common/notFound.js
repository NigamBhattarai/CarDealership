import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import "./notfound.scss";

function NotFound() {
  return (
    <React.Fragment>
      <Header />
      <div className="notFoundMain">
        <aside>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png"
            alt="404"
          />
        </aside>
        <main>
          <h1>Sorry!</h1>
          <p>
            Either you aren't cool enough to visit this page or it doesn't exist{" "}
            <em>. . . like your social life.</em>
          </p>
          <Button as={Link} to="/" className="notFoundHomeButton">You can go now!</Button>
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default NotFound;
