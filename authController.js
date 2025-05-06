const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Dummy user for testing
  const testUser = {
    email: 'test@example.com',
    password: '123456',
    token: 'test-token-abc123',
  };

  if (email === testUser.email && password === testUser.password) {
    return res.status(200).json({ token: testUser.token });
  } else {
    return res.status(401).json({ message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна.' });
  }
};

module.exports = { loginUser };
