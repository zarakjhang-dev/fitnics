import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import CalorieCalculator from "../components/CalorieCalculator";
import FormContainer from "../components/FormContainer";
import Footer from "../components/Footer";

const BMRCalculator = () => {
    return (
        <>
            <FormContainer>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Paper
                        sx={{
                            padding: "2rem",
                            borderRadius: "8px",
                            width: "100%",
                            maxWidth: "500px",
                            textAlign: "center",
                            backgroundColor: "#f8f9fa", // Light background for consistency
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
                            BMR Calculator
                        </Typography>
                        <CalorieCalculator />
                    </Paper>
                </Box>
            </FormContainer>
            <Footer />
        </>
    );
};

export default BMRCalculator;
