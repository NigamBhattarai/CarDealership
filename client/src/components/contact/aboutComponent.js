import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import UseTitle from '../../hooks/useTitle'
import Footer from '../common/footer';
import Header from '../common/header';
import "./about.scss";

function AboutComponent() {
    UseTitle("About us | Cars Cobra");
    return (
        <div>
            <Header />
            <Container className="aboutUsContainer">
                <Row>
                    <Col md="5" className="my-auto">
                        <img
                        src="/images/cobra-logo.png"
                        alt="Car"
                        className="carImage img-responsive img-fluid"
                        />
                    </Col>
                    <Col md="7" className="aboutUsInfoDiv">
                        <div to="/" className="aboutUsName">
                        About us
                        </div>
                        <div className="aboutUsDesc">
                            <Row className="mb-5">
                                Cars Cobra ( Officially known as King Cobra Cars ) is a car dealership organization that has been around since 1989 A.D.
                                We are very proud to announce that we have now gone online and are ready to take orders from our customers from their gadgets.
                                Quality service has always been our priority that's why we have been providing a dedicated employee to our VIP card holder customers and will continue to do so.
                                Our motto is simple, if your customer is not satisfied, the we're not satisfied. From low budget cars to brands like Ford and Lamborghini, 
                                we've got a variety of cars that our customers can choose from. Come visit our dealership if you are more interested on our dealership.
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default AboutComponent
