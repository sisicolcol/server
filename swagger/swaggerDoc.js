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
              url: "http://localhost:3000/docs", // url
              description: "Local server", // name
            },
        ]
    },
    apis: ["./router/*.js" ,"./controller/*.js", "./swagger/swaggerDoc.js"],
};

module.exports = options;