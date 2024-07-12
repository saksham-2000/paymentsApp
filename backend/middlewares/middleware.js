const { JWT_SECRET_KEY } = require("../config");

const jwt = require("jsonwebtoken");

const authMiddleware = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
        message:"This user is not authenticated"
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    }
  } catch (err) {
    return res.status(403).send({
        message:"This user is not authenticated"
    });
  }
};

module.exports = {
  authMiddleware
};
