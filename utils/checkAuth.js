import jwt from "jsonwebtoken";

export const authenticateToken = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, "secret_key");
      req.userId = decoded.id; // Use "id" instead of "_id" to match the token payload
      next();
    } catch (e) {
      res.status(403).json({ message: "Token is invalid or expired" });
    }
  } else {
    res.status(403).json({ message: "Token is missing" });
  }
};
