import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
      <>
        <Container
            className="my-5 p-4"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
        >
          {/* Header */}
          <Row className="justify-content-center mb-4">
            <Col md="auto" className="text-center">
              <h1 style={{ fontWeight: "700", color: "#1dda1d" }}>About Fitnics</h1>
            </Col>
          </Row>

          {/* Description */}
          <Row className="mb-4">
            <Col>
              <p style={{ fontSize: "18px", color: "#555" }}>
                Fitnics is a fitness web app designed to help people reach their
                fitness goals. We provide a comprehensive set of tools and
                resources to make your fitness journey seamless and effective.
              </p>
            </Col>
          </Row>

          {/* Features List */}
          <Row>
            <Col>
              <h3 style={{ fontWeight: "600", color: "#1dda1d" }}>Key Features</h3>
              <ul style={{ fontSize: "16px", color: "#555", paddingLeft: "20px" }}>
                <li>Personal Account</li>
                <li>Diet Profile</li>
                <li>Goal Settings</li>
                <li>Meal Planner</li>
                <li>Water Intake Log</li>
                <li>Workout Database</li>
                <li>Nutrition Checker</li>
                <li>BMR Calculator</li>
              </ul>
            </Col>
          </Row>
        </Container>

        <Footer />
      </>
  );
};

export default AboutUs;
