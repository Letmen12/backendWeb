const pool = require('../db');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM public."User" WHERE email = $1 AND password = $2 LIMIT 1`,
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна.' });
    }

    const token = "demo-token"; // In real case, use JWT
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: 'Серверийн алдаа.' });
  }
};

module.exports = { loginUser };
