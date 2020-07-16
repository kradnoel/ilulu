'use strict';

const { Password } = require('../helpers');

module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('TypeDocuments', [{
    	type: 'BI',
    	createdAt: '2020-06-16 00:00:00',
    	updatedAt: '2020-06-16 00:00:00'
    }, {
    	type: 'Passaporte',
    	createdAt: '2020-06-16 00:00:00',
    	updatedAt: '2020-06-16 00:00:00'
    }], {});


    await queryInterface.bulkInsert('Accounts', [{
      username: 'djamal',
      password: `${await Password.hash('12345')}`,
      role: 2,
      createdAt: '2020-06-15 00:00:00',
    	updatedAt: '2020-06-15 00:00:00',
    }, {
      username: 'leon',
      password: `${await Password.hash('00000')}`,
      role: 3,
      createdAt: '2020-06-15 00:00:00',
    	updatedAt: '2020-06-15 00:00:00',
    }], {});

    //var types = await queryInterface.sequelize.query();

    await queryInterface.bulkInsert('Visitors', [{
    	fullName: 'Leon Dark',
    	docNumber: '1BCD1ASA123',
    	entryDate: '2020-06-16 00:00:00',
    	createdAt: '2020-06-16 00:00:00',
    	updatedAt: '2020-06-16 00:00:00',
    	typeDocumentId: 1
    }, {
    	fullName: 'Djamal dos Santos',
    	docNumber: '1BCD1ASA145',
    	entryDate: '2020-06-15 00:00:00',
    	createdAt: '2020-06-15 00:00:00',
    	updatedAt: '2020-06-15 00:00:00',
    	typeDocumentId: 1
    }], {});


    await queryInterface.bulkInsert('Operators', [{
      firstName: 'Leon',
      lastName: 'Dark',
    	docNumber: '1BCD1ASA123',
    	birthDate: '1995-08-01 00:00:00',
    	createdAt: '2020-06-16 00:00:00',
    	updatedAt: '2020-06-16 00:00:00',
    	TypeDocumentId: 1,
    	AccountId: 1
    }], {});

    await queryInterface.bulkInsert('Residents', [{
      firstName: 'Djamal',
      lastName: 'Dos Santos',
    	docNumber: '1BCD1ASA123',
    	birthDate: '1995-08-01 00:00:00',
    	type: 1,
    	TypeDocumentId: 1,
    	AccountId: 2,
      createdAt: '2020-06-15 00:00:00',
    	updatedAt: '2020-06-15 00:00:00',
    }], {});

    /*
    */

  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TypeDocuments', null, {});
    await queryInterface.bulkDelete('Accounts', null, {});
    await queryInterface.bulkDelete('Visitors', null, {});
    await queryInterface.bulkDelete('Persons', null, {});
    await queryInterface.bulkDelete('Residents', null, {});
  }
};
