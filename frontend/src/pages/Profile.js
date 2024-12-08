import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Route, Routes, useLocation } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import ProfileSidebar from "../components/ProfileSidebar";
import UpdateProfile from "../components/UpdateProfile";
import UpdateDietProfile from "../components/UpdateDietProfile";
import MealPlan from "../components/MealPlan";
import WaterIntake from "../components/WaterIntake";

const Profile = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
        if (userInfo) {
            dispatch(setCredentials(userInfo));
        }
    }, [userInfo, dispatch]);

    const getActiveStyle = (path) => {
        return location.pathname.includes(path)
            ? { color: "#1dda1d", fontWeight: "bold" }
            : { color: "#333" };
    };

    return (
        <Row className="g-4" style={{ padding: "20px", minHeight: "80vh" }}>
            <Col
                md={3}
                className="d-none d-md-block"
                style={{
                    borderRight: "1px solid #ddd",
                    paddingRight: "20px",
                }}
            >
                <ProfileSidebar>
                    <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>
                            <a
                                href="/profile/"
                                style={{
                                    textDecoration: "none",
                                    padding: "10px",
                                    display: "block",
                                    ...getActiveStyle("/profile/"),
                                }}
                            >
                                Update Profile
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile/diet"
                                style={{
                                    textDecoration: "none",
                                    padding: "10px",
                                    display: "block",
                                    ...getActiveStyle("/profile/diet"),
                                }}
                            >
                                Update Diet Profile
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile/meal-plan"
                                style={{
                                    textDecoration: "none",
                                    padding: "10px",
                                    display: "block",
                                    ...getActiveStyle("/profile/meal-plan"),
                                }}
                            >
                                Meal Plan
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile/water-intake"
                                style={{
                                    textDecoration: "none",
                                    padding: "10px",
                                    display: "block",
                                    ...getActiveStyle("/profile/water-intake"),
                                }}
                            >
                                Water Intake
                            </a>
                        </li>
                    </ul>
                </ProfileSidebar>
            </Col>
            <Col xs={12} md={9}>
                <Routes>
                    <Route
                        path="/"
                        element={<UpdateProfile userInfo={userInfo} />}
                    />
                    <Route
                        path="update"
                        element={<UpdateProfile userInfo={userInfo} />}
                    />
                    <Route path="diet" element={<UpdateDietProfile />} />
                    <Route path="meal-plan" element={<MealPlan />} />
                    <Route path="water-intake" element={<WaterIntake />} />
                </Routes>
            </Col>
        </Row>
    );
};

export default Profile;
