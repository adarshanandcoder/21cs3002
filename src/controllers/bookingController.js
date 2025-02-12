const pool = require("../config/db");

exports.bookSeat = async (req, res) => {
  if (req.user.role !== "user") return res.status(403).json({ error: "Only users can book seats" });

  const { train_id } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      "SELECT available_seats FROM trains WHERE id = $1 FOR UPDATE",
      [train_id]
    );

    if (result.rows.length === 0) throw new Error("Train not found");
    if (result.rows[0].available_seats <= 0) throw new Error("No seats available");

    await client.query("UPDATE trains SET available_seats = available_seats - 1 WHERE id = $1", [
      train_id,
    ]);

    await client.query("INSERT INTO bookings (user_id, train_id) VALUES ($1, $2)", [
      req.user.id,
      train_id,
    ]);

    await client.query("COMMIT");
    res.json({ message: "Seat booked successfully" });

  } catch (error) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: error.message });

  } finally {
    client.release();
  }
};

exports.getBookings = async (req, res) => {
  const result = await pool.query("SELECT * FROM bookings WHERE user_id = $1", [req.user.id]);
  res.json(result.rows);
};
