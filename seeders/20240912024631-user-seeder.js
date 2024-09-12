"use strict";

const { HashHelper, AvatarHelper } = require("../helpers");

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
    await queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        password: HashHelper.generate("admin"),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Biodata", [
      {
        image: AvatarHelper.generate("admin"),
        firstName: "admin",
        lastName: "",
        gender: "",
        birthDate: null,
        address: "",
        UserId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
