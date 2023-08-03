const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("Not Authrorized!");

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) throw new Error("Not Authorized or Expired Session");
        else {
          req.user = data;
          next();
        }
      });
    } else {
      throw new Error("Not Authorized or Expired Session");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = verifyToken;
