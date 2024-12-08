import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUpdateWaterIntakeMutation } from "../slices/usersApiSlice";
import { Box, Typography } from "@mui/material";

const WaterIntakeLog = () => {
  const [currentDate, setCurrentDate] = useState(
      new Date().toISOString().split("T")[0]
  );
  const [totalWater, setTotalWater] = useState(0);
  const [loggedWater, setLoggedWater] = useState(0);

  const [updateWaterIntake] = useUpdateWaterIntakeMutation();

  useEffect(() => {
    const fetchWaterIntake = async () => {
      try {
        const response = await fetch(`/api/users/water-intake/${currentDate}`);
        const data = await response.json();

        setTotalWater(data.litersDrank || 0);

        localStorage.setItem("waterIntake", JSON.stringify(data));
      } catch (error) {
        toast.error("Unable to fetch water intake for today.");
        console.error("Fetch water intake error:", error);
      }
    };

    // Load from local storage if available
    const storedWaterIntake = localStorage.getItem("waterIntake");
    if (storedWaterIntake) {
      const parsedWaterIntake = JSON.parse(storedWaterIntake);
      setTotalWater(parsedWaterIntake.litersDrank || 0);
    } else {
      fetchWaterIntake();
    }
  }, [currentDate]);

  const handleChange = (event) => {
    const { value } = event.target;
    setLoggedWater(parseFloat(value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loggedWater <= 0) {
      toast.error("Please enter a valid amount of water.");
      return;
    }

    try {
      const waterIntakeData = {
        litersDrank: totalWater + loggedWater,
      };

      localStorage.setItem("waterIntake", JSON.stringify(waterIntakeData));

      const updatedWaterIntake = await updateWaterIntake(
          waterIntakeData
      ).unwrap();

      if (updatedWaterIntake) {
        toast.success("Water intake updated successfully!");
        setTotalWater(updatedWaterIntake.litersDrank);
        setLoggedWater(0);
      }
    } catch (error) {
      toast.error("Failed to update water intake.");
      console.error("Save water intake error:", error);
    }
  };

  return (
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            padding: "20px",
            backgroundColor: "#f8f9fa",
          }}
      >
        <div
            style={{
              maxWidth: "400px",
              width: "100%",
              background: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
        >
          <Typography
              variant="h5"
              gutterBottom
              style={{
                color: "#1dda1d",
                fontWeight: "700",
              }}
          >
            Water Intake Log
          </Typography>

          <Typography variant="body1" gutterBottom>
            Total water consumed today:{" "}
            <strong>{totalWater.toFixed(2)} litres</strong>
          </Typography>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="totalWater" className="mb-3">
              <Form.Label>Log water consumed (in litres):</Form.Label>
              <Form.Control
                  type="number"
                  min="0.05"
                  step="0.05"
                  placeholder="Enter water amount"
                  value={loggedWater}
                  onChange={handleChange}
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    marginBottom: "10px",
                  }}
              />
            </Form.Group>
            <Button
                type="submit"
                variant="success"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "5px",
                  backgroundColor: "#1dda1d",
                  border: "none",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#c")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#1dda1d")}
            >
              Add Water
            </Button>
          </Form>
        </div>
      </Box>
  );
};

export default WaterIntakeLog;
