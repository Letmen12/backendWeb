const pool = require('../db');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM public."User" WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Нэвтрэх нэр эсвэл нууц буруу байна.' });
    }

    // Энд password-ийг шууд харьцуулж байгаа гэж үзье (жишээ код)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Нэвтрэх нэр эсвэл нууц үгasda буруу байна.' });
    }

    // Амжилттай нэвтэрсэн тохиолдолд
    return res.json({ token: 'dummy-token' }); // Жинхэнэ токен ашиглах бол JWT гэх мэт ашиглана
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Серверийн алдаа.' });
  }
};

module.exports = {
  loginUser,
};
