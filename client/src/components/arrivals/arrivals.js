import axios from "axios";
import { createContext, useEffect, useState } from "react";
import UseTitle from "../../hooks/useTitle";
import Footer from "../common/footer";
import Header from "../common/header";
import AllArrivals from "./allArrivals";
import "./arrivals.scss";
import Loader from "../common/loader"

const AllArrivalsContext = createContext();

function Arrivals() {
  const [selectedCar, setSelectedCar] = useState();
  const [allCars, setAllCars] = useState();
  const [search] = useState();
  const isAllCarsDefined = () => {
    return allCars !== undefined;
  };
  UseTitle("Arrivals | Cars Cobra");
  useEffect(() => {
    axios
      .get("http://localhost:3000/car/all")
      .then((res) => {
        setAllCars(res.data);
        setSelectedCar(res.data[0]);
      })
      .catch((error) => {
        console.log("Failure");
      });
  }, [search]);
  return isAllCarsDefined() ? (
    <AllArrivalsContext.Provider
      value={[
        { selectedCar, setSelectedCar },
        { allCars, setAllCars },
      ]}
    >
      <Header />
      <AllArrivals />
      <Footer />
    </AllArrivalsContext.Provider>
  ) : (
    <Loader active={true} />
  );
}
export { Arrivals, AllArrivalsContext };
