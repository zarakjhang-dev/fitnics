import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for a user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {string} The generated JWT token.
 */
const generateToken = (userId) => {
	return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
		expiresIn: "30d", // Token validity period
	});
};

export default generateToken;
