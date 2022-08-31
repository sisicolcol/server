const express  = require("express");
const router = express.Router();

// const postRouter = require('./post.router');
// const commentRouter = require('./comment.router');
// const userRouter = require("./user.router");
const chatRouter = require("./chat.router");
const adminRouter = require("./admin.router");

module.exports = () => {
    
    // postRouter(router);
    // userRouter(router);
    // commentRouter(router);
    chatRouter(router);
    adminRouter(router);

    return router;
}
