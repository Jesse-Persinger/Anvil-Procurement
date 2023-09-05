// User login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      const payload = {
        user: {
          id: user.id,
          // Add more user data as needed
        },
      };
  
      jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (error, token) => {
        if (error) throw error;
        res.json({ token });
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error.' });
    }
  });