
const swaggerAutogen = require("swagger-autogen")();

const doc = {
 info: {
  title: "시시콜콜 API",
   description: "시시콜콜 Swagger API",
 },
 host: "localhost:3000",
 schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./index.js",
  "./routers/apply.router.js",
  "./routers/message.router.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc);