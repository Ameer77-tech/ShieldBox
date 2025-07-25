import jwt from "jsonwebtoken";

const authorizeToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(409).json({ reply: "Unauthorized user", success: false });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(401)
        .json({ reply: "Unauthorized_user", success: false });
    req.user = user.email;
    next();
  });
};

export default authorizeToken;
