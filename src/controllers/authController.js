const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
    [username, hashedPassword, role]
  );

  res.json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  if (result.rows.length === 0) return res.status(401).json({ error: "User not found" });

  const user = result.rows[0];
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
};
