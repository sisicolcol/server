const express  = require("express");
const router = express.Router();

// const postRouter = require('./post.router');
// const commentRouter = require('./comment.router');
// const userRouter = require("./user.router");
// const messageRouter = require("./message.router");
const adminRouter = require("./admin.router");
const applyRouter = require('./apply.router');
const hpApplyRouter = require('./hp.apply.router');

module.exports = () => {
    
    // postRouter(router);
    // userRouter(router);
    // commentRouter(router);
    // messageRouter(router);
    adminRouter(router);
    applyRouter(router);
    hpApplyRouter(router);

    return router;
}
