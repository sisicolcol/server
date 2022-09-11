const options = {
  swaggerDefinition: {
      openapi: "3.0.0",
      info :{
          title: "시시콜콜 API",
          version: "1.0.0",
          description: "시시콜콜 Swagger API"
      },
      servers: [
          {
            url: "http://api.sscallcall.co.kr/swagger", // url
            description: "Swagger API Server", // name
          },
      ]
  },
  apis: ["../src/routers/*.js" 
  ,"../src/routers/apply.router.js",
  "../src/routers/message.router.js",
  "../src/routers/member.router.js",
  "../src/routers/hp.apply.router.js",
  "../src/routers/helper.router.js",
  "../src/routers/alert.router.js",],
  };

module.exports = options;