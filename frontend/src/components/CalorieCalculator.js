import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Table,
  Container,
  Spinner,
} from "react-bootstrap";

const CalorieCalculator = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const [results, setResults] = useState({
    deficit: "",
    maintenance: "",
    bulking: "",
  });

  const calculateCalories = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setTimeout(() => {
      let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      bmr = Math.trunc(bmr);
      const deficitCalories = bmr - 500;
      const maintenanceCalories = bmr;
      const bulkingCalories = bmr + 500;

      setResults({
        deficit: deficitCalories.toFixed(2),
        maintenance: maintenanceCalories.toFixed(2),
        bulking: bulkingCalories.toFixed(2),
      });

      setLoading(false); // Stop loading
    }, 1000); // Simulate delay for calculation
  };

  return (
      <Container
          className="p-4"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
      >
        <h3 className="text-center mb-4" style={{ color: "#1dda1d", fontWeight: "700" }}>
          Calorie Calculator
        </h3>
        <Form onSubmit={calculateCalories}>
          <FormGroup className="mb-3">
            <FormLabel htmlFor="age">Age: </FormLabel>
            <FormControl
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel htmlFor="weight">Weight (kg): </FormLabel>
            <FormControl
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter your weight"
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel htmlFor="height">Height (cm): </FormLabel>
            <FormControl
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter your height"
            />
          </FormGroup>

          <div className="text-center">
            <Button
                variant="success"
                type="submit"
                className="mb-3 mt-3"
                style={{
                  backgroundColor: "#1dda1d",
                  border: "none",
                  padding: "10px 20px",
                  fontWeight: "500",
                  borderRadius: "25px",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#16b916")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#1dda1d")}
                disabled={loading} // Disable button while loading
            >
              {loading ? (
                  <>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />{" "}
                    Calculating...
                  </>
              ) : (
                  "Calculate Calories"
              )}
            </Button>
          </div>
        </Form>

        {results.deficit && !loading && (
            <Table bordered className="mt-4 text-center">
              <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th>Calorie Type</th>
                <th>Calories</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Deficit</td>
                <td data-testid="deficit">{results.deficit}</td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td data-testid="maintenance">{results.maintenance}</td>
              </tr>
              <tr>
                <td>Bulking</td>
                <td data-testid="bulking">{results.bulking}</td>
              </tr>
              </tbody>
            </Table>
        )}
      </Container>
  );
};

export default CalorieCalculator;
