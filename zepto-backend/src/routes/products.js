router.post('/', auth, async (req, res) => {
  if (!req.user?.mobile) {
    return res.status(403).json({ error: 'You must verify your phone number before adding a product.' });
  }
  const { name, image, price } = req.body;
  const product = await Product.create({ name, image, price, addedBy: req.user.mobile });
  res.json(product);
});
