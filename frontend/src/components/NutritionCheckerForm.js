import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Table, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NutritionCheckerForm = () => {
  const [foodItem, setFoodItem] = useState("");
  const [nutritionResult, setNutritionResult] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state

  const handleSearchNutrition = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      const response = await axios.get(
          `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(
              foodItem
          )}`,
          {
            headers: {
              "X-Api-Key": "WOO23cTA4ww2yrQ+otISmw==Z3Q2fFBcCTeE3OWj",
            },
          }
      );

      const data = response.data;

      if (data.items.length > 0) {
        setNutritionResult(data.items[0]);
        toast.success("Nutrition information retrieved successfully!");
      } else {
        toast.warning("No nutrition information found for that food item.");
        setNutritionResult(null);
      }
    } catch (error) {
      console.error("Error fetching nutrition information:", error);
      toast.error("Failed to fetch nutrition information. Please try again.");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
      <Container className="my-5">
        <ToastContainer />
        <Row className="justify-content-md-center">
          <Col md="auto" className="text-center">
            <h2 className="mb-4" style={{ color: "#1dda1d", fontWeight: "700" }}>
              Nutrition Information Search
            </h2>
            <Form onSubmit={handleSearchNutrition} className="d-flex align-items-center">
              <Form.Control
                  type="text"
                  value={foodItem}
                  onChange={(e) => setFoodItem(e.target.value)}
                  placeholder="Enter food item"
                  className="me-2"
                  required
              />
              <Button
                  variant="success"
                  type="submit"
                  style={{
                    backgroundColor: "#1dda1d",
                    border: "none",
                  }}
                  disabled={loading} // Disable while loading
              >
                {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" />
                      {" "}Loading...
                    </>
                ) : (
                    "Get"
                )}
              </Button>
            </Form>
          </Col>
        </Row>

        {nutritionResult && (
            <Row className="mt-5">
              <Col>
                <h3 className="text-center mb-4" style={{ color: "#1dda1d" }}>
                  Nutrition Results
                </h3>
                <Table striped bordered hover responsive="md" className="text-center">
                  <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th>Name</th>
                    <th>Serving Size</th>
                    <th>Calories</th>
                    <th>Total Fat</th>
                    <th>Saturated Fat</th>
                    <th>Cholesterol</th>
                    <th>Sodium</th>
                    <th>Carbohydrates</th>
                    <th>Fiber</th>
                    <th>Sugar</th>
                    <th>Protein</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>{nutritionResult.name}</td>
                    <td>100g</td>
                    <td>{nutritionResult.calories}</td>
                    <td>{nutritionResult.fat_total_g}g</td>
                    <td>{nutritionResult.fat_saturated_g}g</td>
                    <td>{nutritionResult.cholesterol_mg}mg</td>
                    <td>{nutritionResult.sodium_mg}mg</td>
                    <td>{nutritionResult.carbohydrates_total_g}g</td>
                    <td>{nutritionResult.fiber_g}g</td>
                    <td>{nutritionResult.sugar_g}g</td>
                    <td>{nutritionResult.protein_g}g</td>
                  </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
        )}
      </Container>
  );
};

export default NutritionCheckerForm;
