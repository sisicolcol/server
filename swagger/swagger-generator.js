
const swaggerAutogen = require("swagger-autogen")();

const doc = {
 info: {
  title: "시시콜콜 API",
   description: "시시콜콜 Swagger API",
 },
 host: "localhost:3000",
 schemes: ["http"],
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = [
  "../src/routers/*.router.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);