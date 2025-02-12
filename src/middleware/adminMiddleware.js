const adminAuth = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    next();
  };
  
  module.exports = adminAuth;
  