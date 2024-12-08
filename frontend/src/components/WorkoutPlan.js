import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Table, Spinner, Alert } from "react-bootstrap";

const WorkoutPlan = () => {
	const [exercises, setExercises] = useState([]);
	const [workoutPlan, setWorkoutPlan] = useState([]);
	const [muscles, setMuscles] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await axios.get(
					"https://exercisedb.p.rapidapi.com/exercises",
					{
						headers: {
							"x-rapidapi-key":
								"e0ace3e284mshe9e6f1bef06c19bp1d40c9jsne660716d3610",
							"x-rapidapi-host": "exercisedb.p.rapidapi.com",
						},
						params: { muscles, equipment: "dumbbell", difficulty: "1" },
					}
				);
				setExercises(response.data);
			} catch (err) {
				setError("Failed to fetch exercises. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		if (muscles) {
			fetchData();
		}
	}, [muscles]);

	useEffect(() => {
		if (exercises.length > 0) {
			const randomExercises = Array.from({ length: 7 }, () => {
				const randomIndex = Math.floor(Math.random() * exercises.length);
				const exercise = exercises[randomIndex];
				return {
					exercise: exercise.name,
					sets: Math.floor(Math.random() * 4) + 1,
					reps: Math.floor(Math.random() * 10) + 5,
				};
			});
			setWorkoutPlan(randomExercises);
		}
	}, [exercises]);

	return (
		<div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
			<h2 className="text-center mb-4" style={{ color: "#1dda1d" }}>
				Bro-Split Workout Generator
			</h2>
			<Form.Group controlId="muscles" className="mb-4">
				<Form.Label>Select Muscle Group</Form.Label>
				<Form.Control
					as="select"
					value={muscles}
					onChange={(e) => setMuscles(e.target.value)}
					style={{
						padding: "10px",
						fontSize: "16px",
						borderRadius: "5px",
					}}
				>
					<option value="">Select a muscle group</option>
					<option value="back">Back</option>
					<option value="cardio">Cardio</option>
					<option value="chest">Chest</option>
					<option value="lower%20arms">Lower Arms</option>
					<option value="lower%20legs">Lower Legs</option>
					<option value="upper%20arms">Upper Arms</option>
					<option value="upper%20legs">Upper Legs</option>
					<option value="neck">Neck</option>
					<option value="shoulders">Shoulders</option>
					<option value="waist">Waist</option>
				</Form.Control>
			</Form.Group>

			{loading && (
				<div className="text-center mb-4">
					<Spinner
						animation="border"
						role="status"
						style={{
							color: "#1dda1d",
							width: "3rem",
							height: "3rem",
						}}
					>
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			)}

			{error && (
				<Alert variant="danger" className="text-center">
					{error}
				</Alert>
			)}

			{workoutPlan.length > 0 && !loading && (
				<Table
					striped
					bordered
					hover
					responsive="sm"
					className="text-center mt-4"
					style={{
						boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Added shadow
					}}
				>
					<thead style={{ backgroundColor: "#f8f9fa" }}>
					<tr>
						<th>Exercise</th>
						<th>Sets</th>
						<th>Reps</th>
					</tr>
					</thead>
					<tbody>
					{workoutPlan.map((exercise, index) => (
						<tr key={index}>
							<td>{exercise.exercise}</td>
							<td>{exercise.sets}</td>
							<td>{exercise.reps}</td>
						</tr>
					))}
					</tbody>
				</Table>
			)}

			{!loading && !error && workoutPlan.length === 0 && muscles && (
				<div className="text-center mt-4">
					<p>No exercises found for the selected muscle group.</p>
				</div>
			)}
		</div>
	);
};

export default WorkoutPlan;
