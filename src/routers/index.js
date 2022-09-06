const express  = require("express");
const router = express.Router();

const adminRouter = require("./admin.router");
const applyRouter = require('./apply.router');
const hpApplyRouter = require('./hp.apply.router');
const alertRouter = require('./alert.router');

module.exports = () => {
    adminRouter(router);
    applyRouter(router);
    hpApplyRouter(router);
    alertRouter(router);

    return router;
}
