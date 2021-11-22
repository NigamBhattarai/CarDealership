import React, { useContext } from 'react'
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {AllArrivalsContext} from "./arrivals";

var CoverBackground = (selectedCar) => {
    const style = {
      background: "url(" + (selectedCar?"http://localhost:3000"+selectedCar.images[0]:"") + ") center center / 100% no-repeat",
      height: "500px",
    };
    return style;
};
    
function CoverImage() {
  const [{selectedCar}] = useContext(AllArrivalsContext);
  return (
    <Row as={Link} to={`/car/${((selectedCar)&&selectedCar._id)}`}>
        <div className="coverImage" style={CoverBackground(selectedCar)}>
          <div className="coverImageCaption">
            <h3>{(selectedCar)&&selectedCar.name}</h3>
            <p>{(selectedCar)&&selectedCar.desc.substring(0, 200)}...</p>
          </div>
        </div>
    </Row>
    )
}

export default CoverImage
