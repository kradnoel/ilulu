'use strict';

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

    //var types = await queryInterface.sequelize.query();
    
    await queryInterface.bulkInsert('Visitors', [{
    	fullName: 'Leon Dark',
    	docNumber: '1BCD1ASA123',
    	entryDate: '2020-06-16 00:00:00',
    	createdAt: '2020-06-16 00:00:00',
    	updatedAt: '2020-06-16 00:00:00',
    	TypeDocumentId: 1
    }, {
    	fullName: 'Djamal dos Santos',
    	docNumber: '1BCD1ASA145',
    	entryDate: '2020-06-15 00:00:00',
    	createdAt: '2020-06-15 00:00:00',
    	updatedAt: '2020-06-15 00:00:00',
    	TypeDocumentId: 1
    }], {});

  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TypeDocuments', null, {});
    await queryInterface.bulkDelete('Visitors', null, {});
  }
};
