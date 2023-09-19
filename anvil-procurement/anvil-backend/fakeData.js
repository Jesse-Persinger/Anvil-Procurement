const sequelize = require('./db')
const Item = require('./models/Item');
const { faker } = require("@faker-js/faker");

async function seedDatabase() {
    // Sync the database (ensure the table exists)
    await sequelize.sync();
  
    // Generate and add 50 random items to the database
    for (let i = 0; i < 50; i++) {
      const item = await Item.create({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: parseFloat(faker.commerce.price()),
    // Add the rest of the columns
    // math for random relationships {category_id: Math.floor(Math.random() * 10) + 1,}
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