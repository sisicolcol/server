const HelperService = require('../services/helper.service');

const baseResponse = require('../utilities/baseResponseStatus');
const { errResponse, response } = require('../utilities/response');

class HelperController {
    HelperService;

    constructor(){
        this.HelperService = new HelperService();
    }
}

module.exports = HelperController;