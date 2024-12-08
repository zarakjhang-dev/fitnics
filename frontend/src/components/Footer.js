import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer
            style={{
                backgroundColor: "#ffffff", // White background
                borderTop: "2px solid #eaeaea", // Subtle top border
                boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)", // Shadow for depth
                padding: "20px 0",
            }}
        >
            <Container>
                <Row className="align-items-center">
                    {/* Navigation Links */}
                    <Col md={6} className="mb-3 mb-md-0">
                        <Nav className="justify-content-center justify-content-md-start">
                            <Nav.Item>
                                <Nav.Link
                                    as={Link}
                                    to="/pages/about"
                                    style={{
                                        color: "#333",
                                        fontWeight: "500",
                                        marginRight: "15px",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.color = "#1dda1d")}
                                    onMouseLeave={(e) => (e.target.style.color = "#333")}
                                >
                                    About
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    as={Link}
                                    to="/pages/features"
                                    style={{
                                        color: "#333",
                                        fontWeight: "500",
                                        marginRight: "15px",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.color = "#1dda1d")}
                                    onMouseLeave={(e) => (e.target.style.color = "#333")}
                                >
                                    Features
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    as={Link}
                                    to="/pages/workouts"
                                    style={{
                                        color: "#333",
                                        fontWeight: "500",
                                        marginRight: "15px",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.color = "#1dda1d")}
                                    onMouseLeave={(e) => (e.target.style.color = "#333")}
                                >
                                    Workout Planner
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    as={Link}
                                    to="/pages/nutrition-checker"
                                    style={{
                                        color: "#333",
                                        fontWeight: "500",
                                        marginRight: "15px",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.color = "#1dda1d")}
                                    onMouseLeave={(e) => (e.target.style.color = "#333")}
                                >
                                    Nutrition Checker
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    as={Link}
                                    to="/pages/bmr-calculator"
                                    style={{
                                        color: "#333",
                                        fontWeight: "500",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.color = "#1dda1d")}
                                    onMouseLeave={(e) => (e.target.style.color = "#333")}
                                >
                                    BMR
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    {/* Copyright Section */}
                    <Col md={6} className="text-center text-md-end">
                        <p style={{ margin: 0, fontSize: "14px", fontWeight: "400", color: "#555" }}>
                            © 2024 <span style={{ fontWeight: "600", color: "#1dda1d" }}>Fitnics, Inc.</span> All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
