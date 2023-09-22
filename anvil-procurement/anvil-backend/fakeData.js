const sequelize = require('./db');
const Vendor = require('./models/Vendor');
const Item = require('./models/Item');
const { faker } = require('@faker-js/faker');

async function seedDatabase() {
  // Sync the database (ensure the tables exist)
  await sequelize.sync();

  // Generate and add 10 random vendors to the database
  const vendors = [];
  for (let i = 0; i < 10; i++) {
    const vendor = await Vendor.create({
      name: faker.company.name(),
      // Add other vendor attributes as needed
    });
    console.log(`Added vendor: ${vendor.name}`);
    vendors.push(vendor);
  }

  // Generate and add 50 random items to the database
  for (let i = 0; i < 50; i++) {
    // console.log(randomVendor + '=========');
    const item = await Item.create({
      category_id: Math.floor(Math.random() * 10) + 1,
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      imgUrl: faker.image.urlLoremFlickr({ category: 'technics' }),
      price: faker.number.float({ max: 500 }),
      vendor_id: Math.floor(Math.random() * 10) + 1
    });
    console.log(`Added item: ${item.name}`);
  }
}

seedDatabase()
  .then(() => {
    console.log('Database seeding completed.');
  })
  .catch((error) => {
    console.error('Error seeding the database:', error);
  })
  .finally(() => {
    // Close the database connection when seeding is complete
    sequelize.close();
  });