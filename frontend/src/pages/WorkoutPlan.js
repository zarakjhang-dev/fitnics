import React from "react";
import { Box } from "@mui/material";

import Footer from "../components/Footer";
import WorkoutPlan from "../components/WorkoutPlan";

const WorkoutPlans = () => {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "80vh",
				}}>
				<WorkoutPlan />
			</Box>
			<Footer />
		</>
	);
};

export default WorkoutPlans;
