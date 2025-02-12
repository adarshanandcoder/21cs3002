const pool = require("../config/db");

exports.addTrain = async (req, res) => {
  const { name, source, destination, total_seats } = req.body;

  await pool.query(
    "INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $4)",
    [name, source, destination, total_seats]
  );

  res.json({ message: "Train added successfully" });
};

exports.getTrains = async (req, res) => {
  const { source, destination } = req.query;
  const result = await pool.query("SELECT * FROM trains WHERE source = $1 AND destination = $2", [
    source,
    destination,
  ]);

  res.json(result.rows);
};
