const pool = require('../db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Хэрэглэгч аль хэдийн бүртгэлтэй эсэхийг шалгана
    const exists = await pool.query('SELECT * FROM public."User" WHERE email = $1', [email]);
    if (exists.rows.length > 0) {
      return res.status(400).json({ message: 'Энэ имэйл аль хэдийн бүртгэлтэй байна.' });
    }

    // Нууц үгийг шифрлэнэ
    const hashedPassword = await bcrypt.hash(password, 10);

    // Шинээр хадгална
    const result = await pool.query(
      'INSERT INTO public."User" (email, password, username) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, username]
    );

    const user = result.rows[0];
    res.status(201).json({ token: 'dummy-token', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Серверийн алдаа.' });
  }
};

module.exports = {
  registerUser,
};
