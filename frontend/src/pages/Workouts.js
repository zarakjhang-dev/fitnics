import React from "react";
import { Box } from "@mui/material";

import ExercisePage from "../components/ExerciseDB";
import Footer from "../components/Footer";

const Workouts = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column", // Supports stacking if needed
                    minHeight: "80vh", // Ensures the box adapts to content
                    padding: { xs: "2rem", md: "0" }, // Adds padding for smaller screens
                    backgroundColor: "#f8f9fa", // Light background for consistency
                }}
            >
                <ExercisePage />
            </Box>
            <Footer />
        </>
    );
};

export default Workouts;
