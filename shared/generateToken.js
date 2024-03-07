import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
  return await jwt.sign(
    { id: user._id, role: user.admin },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
};
