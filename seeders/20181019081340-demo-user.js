'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Ivan',
        lastName: 'Magaš',
        email: "ivan@magas.com",
        age: 23
      },
      {
        firstName: 'Šime',
        lastName: 'Magaš',
        email: "šime@magas.com",
        age: 26
      },
      {
        firstName: 'Jure',
        lastName: 'Magaš',
        email: "Jure@magas.com",
        age: 25
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});    
  }
};
