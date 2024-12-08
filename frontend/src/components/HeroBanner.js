import React from 'react';
import { Link } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';
import HeroBannerImage from '../assets/images/banner.png';
import Logo from '../assets/images/banner-logo.png';

const HeroBanner = () => {
    return (
        <Box
            sx={{
                mt: { lg: '20px', xs: '70px' },
                ml: { sm: '50px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: { lg: 'row', xs: 'column' }, // Responsive layout
                gap: '20px', // Add gap for spacing between elements
                p: '20px',
                backgroundColor: '#f8f9fa', // Light background for better contrast
                borderRadius: '8px', // Rounded corners for modern design
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
            }}
            position="relative"
        >
            {/* Left Section */}
            <Box flex="1" textAlign={{ xs: 'center', lg: 'left' }}>
                <Typography
                    color="#1dda1d"
                    fontWeight="700"
                    fontSize={{ lg: '32px', xs: '24px' }}
                    sx={{ mb: '10px' }}
                >
                    FITNICS
                </Typography>
                <img
                    src={Logo}
                    alt="Fitnics Logo"
                    style={{ width: '120px', marginBottom: '10px' }}
                />
                <Typography
                    fontWeight="700"
                    sx={{ fontSize: { lg: '44px', xs: '32px' }, mb: '15px', lineHeight: '1.5' }}
                >
                    We are here to help <br /> you achieve your <br /> fitness dreams.
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    component={Link}
                    to="../pages/features"
                    sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        padding: '10px 20px',
                        borderRadius: '25px', // Rounded button
                        backgroundColor: "#1dda1d",
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: "#44b244", // Darker green on hover
                        },
                    }}
                >
                    What We Offer
                </Button>
            </Box>

            {/* Right Section */}
            <Box flex="1" textAlign="center">
                <img
                    src={HeroBannerImage}
                    alt="Hero Banner"
                    className="img-fluid"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
            </Box>
        </Box>
    );
};

export default HeroBanner;
