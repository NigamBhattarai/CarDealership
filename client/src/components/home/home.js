import React from "react";
import Header from "../common/header";
import CarouselComponent from "./carouselComponent";
import PopularCars from "./popularcars";
import "./home.scss";
import NewArrivals from "./newArrivals";
import Footer from "../common/footer";
import NewsLetter from "./newsletter";
import UseTitle from "../../hooks/useTitle";

function Home() {
  UseTitle("Home | Cars Cobra");
  return (
    <React.Fragment>
      <Header />
      <CarouselComponent />
      <PopularCars />
      <NewArrivals />
      <NewsLetter />
      <Footer />
    </React.Fragment>
  );
}
export default Home;
