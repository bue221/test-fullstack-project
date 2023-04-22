import jwt from "jsonwebtoken";

export function requireAuthorization(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const token = authHeader && authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Token invalido" });
  }

  next();
}
