import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const ProfileSidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <ListGroup>
            {[
                { path: "/pages/profile/update", label: "Update Profile" },
                { path: "/pages/profile/diet", label: "Update Diet Profile" },
                { path: "/pages/profile/meal-plan", label: "Meal Plan" },
                { path: "/pages/profile/water-intake", label: "Water Intake" },
            ].map(({ path, label }) => (
                <ListGroup.Item
                    as={Link}
                    to={path}
                    key={path}
                    active={false} // Prevent default active styling
                    style={{
                        color: isActive(path) ? "#1dda1d" : "#333",
                        fontWeight: isActive(path) ? "bold" : "normal",
                        textDecoration: "none",
                        cursor: "pointer",
                        backgroundColor: isActive(path) ? "#f0fdf4" : "transparent", // Light green background for active
                        border: "none",
                    }}
                >
                    {label}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ProfileSidebar;
