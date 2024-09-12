"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const fakeProducts = [];

    for (let i = 0; i < 100; i++) {
      // Change 50 to the number of products you want to insert
      fakeProducts.push({
        name: faker.commerce.productName(),
        stock: faker.number.int({ min: 1, max: 100 }), // Random stock between 1 and 100
        price: faker.number.int({ min: 10, max: 10000000 }), // Random price between 10 and 1000
        image: faker.image.url(), // Random image URL
        description: faker.commerce.productDescription(),
        CategoryId: faker.number.int({ min: 1, max: 3 }), // CategoryId between 1 and 3
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Products", fakeProducts, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
