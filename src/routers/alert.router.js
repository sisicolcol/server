const AlertController = require('../controllers/alert.controller');

const alertRouter = (router)=>{

    this.AlertController = new AlertController();

    // 기기 토큰 받아와서 테이블에 저장하기 
    router.get('/alert', this.AlertController.getToken);
}

module.exports = alertRouter;