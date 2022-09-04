const HpApplyModel = require("../repositorys/hp.apply.repository");

const { pool } = require("../config/db");

const baseResponse = require('../utilities/baseResponseStatus')
const { errResponse, response } = require('../utilities/response');

class HpApplyService {

    HpApplyModel;

    constructor(){
        this.HpApplyModel = new HpApplyModel();
    }

}

module.exports = HpApplyService;