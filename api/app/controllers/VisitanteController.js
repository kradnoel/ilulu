// Require the needed functions
const { sendResponse } = require('../helpers');
const db = require('../models');
const Visitante = db.visitante;
const Op = db.Sequelize.Op;

class VisitanteController {
  static all = async(req, res) => {
    sendResponse(res)(Visitante.findAll());
  }
}

module.exports = VisitanteController;
