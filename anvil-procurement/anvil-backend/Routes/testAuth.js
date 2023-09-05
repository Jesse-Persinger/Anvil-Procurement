// Example route that requires authentication
router.get('/profile', authenticateUser, async (req, res) => {
    // Accessible only to authenticated users
    res.json({ message: 'Access granted.' });
  });