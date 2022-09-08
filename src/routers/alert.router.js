const AlertController = require('../controllers/alert.controller');

const alertRouter = (router)=>{

    this.AlertController = new AlertController();

    // 기기 토큰 받아와서 테이블에 저장하기 
    router.post('/alert', this.AlertController.postToken);

    // 알림 목록 
    router.get('/alertlist/:mem_id', this.AlertController.getAlertList);
}

module.exports = alertRouter;