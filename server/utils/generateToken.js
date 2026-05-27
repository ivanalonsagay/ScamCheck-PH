import jwt from "jsonwebtoken";

const generateToken = (userId, role) => {
  // Create login token
  return jwt.sign(
    {
      id: userId,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d", // Token expires after 7 days
    }
  );
};

export default generateToken;