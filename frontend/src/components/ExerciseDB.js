import React, { useState } from "react";
import axios from "axios";

const ExercisePage = () => {
	const [selectedMuscle, setSelectedMuscle] = useState("");
	const [exercises, setExercises] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [exercisesPerPage] = useState(10);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleMuscleChange = (e) => {
		setSelectedMuscle(e.target.value);
	};

	const handleSearch = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await axios.get(
				`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedMuscle}`,
				{
					headers: {
						"X-RapidAPI-Key": "e0ace3e284mshe9e6f1bef06c19bp1d40c9jsne660716d3610",
						"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
					},
				}
			);
			setExercises(response.data);
		} catch (err) {
			setError("Failed to fetch exercises. Please try again.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const indexOfLastExercise = currentPage * exercisesPerPage;
	const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
	const currentExercises = exercises.slice(
		indexOfFirstExercise,
		indexOfLastExercise
	);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const capitalizeFirstLetter = (string) =>
		string.charAt(0).toUpperCase() + string.slice(1);

	return (
		<div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
			<h2 style={{ textAlign: "center", color: "#1dda1d", marginBottom: "20px" }}>
				Search For A Perfect Exercise
			</h2>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "10px",
					marginBottom: "20px",
				}}
			>
				<select
					value={selectedMuscle}
					onChange={handleMuscleChange}
					style={{
						padding: "10px",
						fontSize: "16px",
						borderRadius: "5px",
						border: "1px solid #ddd",
					}}
				>
					<option value="">Select A Muscle Group</option>
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
				</select>
				<button
					onClick={handleSearch}
					style={{
						backgroundColor: "#1dda1d",
						color: "white",
						padding: "10px 20px",
						border: "none",
						fontSize: "16px",
						cursor: "pointer",
						borderRadius: "5px",
						transition: "background-color 0.3s",
					}}
					onMouseEnter={(e) => (e.target.style.backgroundColor = "#16b916")}
					onMouseLeave={(e) => (e.target.style.backgroundColor = "#1dda1d")}
				>
					Search
				</button>
			</div>

			{loading && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: "10px",
						fontSize: "18px",
						color: "#1dda1d",
					}}
				>
					<div
						style={{
							width: "24px",
							height: "24px",
							border: "3px solid #1dda1d",
							borderTop: "3px solid transparent",
							borderRadius: "50%",
							animation: "spin 1s linear infinite",
						}}
					></div>
					<span>Loading...</span>
				</div>
			)}
			{error && (
				<div style={{ textAlign: "center", color: "red", fontSize: "18px" }}>
					{error}
				</div>
			)}

			{currentExercises.length > 0 ? (
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "20px",
						justifyContent: "center",
					}}
				>
					{currentExercises.map((exercise) => (
						<div
							key={exercise.id}
							style={{
								backgroundColor: "#ffffff",
								border: "1px solid #ddd",
								borderRadius: "10px",
								boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
								width: "280px",
								padding: "10px",
								textAlign: "center",
							}}
						>
							<h3 style={{ fontSize: "18px", color: "#333", marginBottom: "10px" }}>
								{capitalizeFirstLetter(exercise.name)}
							</h3>
							<div
								style={{
									width: "100%",
									height: "200px",
									overflow: "hidden",
								}}
							>
								<img
									src={exercise.gifUrl}
									alt={exercise.name}
									style={{ width: "100%", objectFit: "cover" }}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				!loading && !error && (
					<h3 style={{ textAlign: "center", fontSize: "18px", color: "#777" }}>
						Exercises and demonstrations will be displayed here.
					</h3>
				)
			)}

			{exercises.length > exercisesPerPage && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "20px",
					}}
				>
					{Array.from({
						length: Math.ceil(exercises.length / exercisesPerPage),
					}).map((_, index) => (
						<button
							key={index}
							onClick={() => paginate(index + 1)}
							style={{
								backgroundColor: currentPage === index + 1 ? "#1dda1d" : "#f8f9fa",
								color: currentPage === index + 1 ? "white" : "#333",
								border: "1px solid #ddd",
								padding: "10px",
								margin: "0 5px",
								cursor: "pointer",
								borderRadius: "5px",
							}}
						>
							{index + 1}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default ExercisePage;
