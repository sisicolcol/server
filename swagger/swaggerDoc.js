const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info :{
            title: "GridgeTestChallenge API",
            version: "1.0.0",
            description: "그릿지테스트챌린지 Swagger API"
        },
        servers: [
            {
              url: "http://localhost:5050/docs", // url
              description: "Local server", // name
            },
        ]
    },
    apis: ["./routers/*.js" ,"./controllers/*.js", "./swagger/swaggerDoc.js"],
};

module.exports = options;