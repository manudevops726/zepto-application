const bcrypt = require('bcryptjs');
const { sequelize, User, Product, Order } = require('./src/models');

async function seed() {
  try {
    // Recreate tables (use { force: true } to reset DB completely)
    await sequelize.sync({ force: true });
    console.log('🔄 Database synced');

    // Create default user
    const passwordHash = await bcrypt.hash('password123', 10);
    const user = await User.create({
      email: 'testuser@example.com',
      password: passwordHash,
    });
    console.log('👤 Default user created:', user.email);

    // Seed products
    const products = await Product.bulkCreate([
      { name: 'Banana', image: 'https://images.heb.com/is/image/HEBGrocery/000377497', price: 70, addedBy: 'Admin' },
      { name: 'Cranberries', image: 'https://i.pinimg.com/originals/47/6c/f3/476cf3fce6bdddedd21e887ef9fcf0ab.jpg', price: 125, addedBy: 'Admin' },
      { name: 'Spinach', image: 'https://lettuceinfo.org/wp-content/uploads/2020/09/Spinach.jpg', price: 45, addedBy: 'Admin' },
      { name: 'Raddish', image: 'https://img.freepik.com/premium-photo/daikon_1092848-380.jpg', price: 50, addedBy: 'Admin' },
      { name: 'Rose', image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/11/25150143/1-18.jpg', price: 100, addedBy: 'Admin' },
    ]);
    console.log(`🛒 ${products.length} products inserted`);

    // Create sample orders for the default user
    await Order.create({
      userId: user.id,
      productId: products[0].id, // Banana
      quantity: 3,
    });

    await Order.create({
      userId: user.id,
      productId: products[2].id, // Spinach
      quantity: 1,
    });

    console.log('📦 Sample orders created');
    console.log('✅ Seeding completed successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
