import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useCreateMealPlanMutation,
  useUpdateMealPlanMutation,
} from "../slices/usersApiSlice";

const MealPlan = () => {
  const [currentDate, setCurrentDate] = useState(
      new Date().toISOString().split("T")[0]
  );

  const [meal1, setMeal1] = useState("");
  const [meal2, setMeal2] = useState("");
  const [meal3, setMeal3] = useState("");
  const [meal4, setMeal4] = useState("");
  const [meal5, setMeal5] = useState("");
  const [snacks, setSnacks] = useState("");

  const [createMealPlan] = useCreateMealPlanMutation();
  const [updateMealPlan] = useUpdateMealPlanMutation();

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await fetch(`/api/user/meal-plan/${currentDate}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        setMeal1(data.meal1 || "");
        setMeal2(data.meal2 || "");
        setMeal3(data.meal3 || "");
        setMeal4(data.meal4 || "");
        setMeal5(data.meal5 || "");
        setSnacks(data.snacks || "");

        localStorage.setItem("mealPlan", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch meal plan:", error);
      }
    };

    fetchMealPlan();
  }, [currentDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mealPlanData = {
      date: currentDate,
      meal1,
      meal2,
      meal3,
      meal4,
      meal5,
      snacks,
    };

    try {
      const existingMealPlan = await updateMealPlan(mealPlanData).unwrap();
      if (existingMealPlan) {
        toast.success("Meal plan updated successfully!");
      } else {
        const newMealPlan = await createMealPlan(mealPlanData).unwrap();
        if (newMealPlan) {
          toast.success("Meal plan created successfully!");
        }
      }

      localStorage.setItem("mealPlan", JSON.stringify(mealPlanData));
    } catch (error) {
      toast.error("Failed to save the meal plan.");
      console.error("Error saving meal plan:", error);
    }
  };

  return (
      <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
        <h2 className="text-center mb-4" style={{ color: "#1dda1d" }}>
          Meal Plan
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="date" className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
            />
          </Form.Group>

          {[
            { id: "meal1", label: "Meal 1", value: meal1, setValue: setMeal1 },
            { id: "meal2", label: "Meal 2", value: meal2, setValue: setMeal2 },
            { id: "meal3", label: "Meal 3", value: meal3, setValue: setMeal3 },
            { id: "meal4", label: "Meal 4", value: meal4, setValue: setMeal4 },
            { id: "meal5", label: "Meal 5", value: meal5, setValue: setMeal5 },
            { id: "snacks", label: "Snacks", value: snacks, setValue: setSnacks },
          ].map(({ id, label, value, setValue }) => (
              <Form.Group key={id} controlId={id} className="mb-3">
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
              </Form.Group>
          ))}

          <Button
              type="submit"
              variant="success"
              style={{
                width: "100%",
                backgroundColor: "#1dda1d",
                border: "none",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "5px",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#16b916")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#1dda1d")}
          >
            Save Meal Plan
          </Button>
        </Form>
      </div>
  );
};

export default MealPlan;
