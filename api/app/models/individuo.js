module.exports = (sequelize, Sequelize) => {
  const Individuo = sequelize.define("individuo", {
    name: { type: Sequelize.STRING },
    surname: { type: Sequelize.STRING },
    type_doc: {type: Sequelize.ENUM('BI', 'Passport', 'Outro')},
    number_doc: { type: Sequelize.STRING },
    entry_date: { type: Sequelize.DATE}
  });

  return Individuo;
};
