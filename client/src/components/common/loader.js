import React from "react";
import { Spinner } from "react-bootstrap";
import "./loader.scss";

function Loader({ active }) {
  return active ? (
    <div className="fullScreenLoader border d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    ""
  );
}

export default Loader;
