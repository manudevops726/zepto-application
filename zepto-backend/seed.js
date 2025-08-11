const { Product, sequelize } = require('./models');

async function seed() {
  await sequelize.sync({ force: false }); // ensure tables exist, but don't drop data

  const products = [
    { name: 'Banana', image: 'https://images.heb.com/is/image/HEBGrocery/000377497', price: 70 },
    { name: 'Cranberries', image: 'https://i.pinimg.com/originals/47/6c/f3/476cf3fce6bdddedd21e887ef9fcf0ab.jpg', price: 125 },
    { name: 'Spinach', image: 'https://lettuceinfo.org/wp-content/uploads/2020/09/Spinach.jpg', price: 45 },
    { name: 'Raddish', image: 'https://img.freepik.com/premium-photo/daikon_1092848-380.jpg', price: 50 },
    { name: 'Rose', image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/11/25150143/1-18.jpg', price: 100 }
  ];

  for (const product of products) {
    await Product.findOrCreate({ where: { name: product.name }, defaults: product });
  }

  console.log('Seeding done!');
  process.exit();
}

seed().catch(console.error);