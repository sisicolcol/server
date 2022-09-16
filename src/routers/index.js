const express  = require("express");
const router = express.Router();

// const postRouter = require('./post.router');
// const commentRouter = require('./comment.router');
// const userRouter = require("./user.router");
const messageRouter = require("./message.router");
const applyRouter = require('./apply.router');
const hpApplyRouter = require('./hp.apply.router');
const helperRouter = require('./helper.router');
const memberRouter = require('./member.router');
const alertRouter = require('./alert.router');


module.exports = () => {
    
    // postRouter(router);
    // userRouter(router);
    // commentRouter(router);
    messageRouter(router);
    applyRouter(router);
    hpApplyRouter(router);
    helperRouter(router);
    memberRouter(router);

    alertRouter(router);
    

    return router;
}
