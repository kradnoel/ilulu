module.exports = (sequelize, Sequelize) => {
  const Visitante = sequelize.define("visitante", {
    name: { type: Sequelize.STRING },
    type_doc: {type: Sequelize.ENUM('BI', 'Passport', 'Outro')},
    number_doc: { type: Sequelize.STRING },
    entry_date: { type: Sequelize.DATE}
  });

  return Visitante;
};
