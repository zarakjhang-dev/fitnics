import React from "react";
import { Box, Typography } from "@mui/material";

import NutritionCheckerForm from "../components/NutritionCheckerForm";
import Footer from "../components/Footer";

const NutritionChecker = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: { xs: "auto", md: "80vh" }, // Responsive height
                    padding: { xs: "2rem", md: "0" },
                    backgroundColor: "#f8f9fa", // Light background for consistency
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "600px",
                        padding: "2rem",
                        textAlign: "center",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            marginBottom: "1.5rem",
                            fontWeight: "700",
                            color: "#1dda1d",
                        }}
                    >
                        Nutrition Checker
                    </Typography>
                    <NutritionCheckerForm />
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default NutritionChecker;
