import './App.css';
import { Routes, Route } from "react-router";
import {Helmet} from "react-helmet";
import Home from './home/home';
import "./App.scss";
import React from 'react';
import {Arrivals} from './arrivals/arrivals';
import CarComponent from './carcomponent/carComponent';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import ContactComponent from './contact/contactComponent';
import AboutComponent from './contact/aboutComponent';

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 7000,
  offset: '10px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 9999
  }}

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Helmet>
          <style>{'body { background-color: #000; }'}</style>
      </Helmet>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/arrivals" element={<Arrivals />} />
        <Route path="/car/:id" element={<CarComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
        <Route path="/about" element={<AboutComponent />} />
      </Routes>
    </AlertProvider>

  );
}

export default App;
