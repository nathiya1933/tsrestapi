const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/swagger_output.json'; 
const endpointsFiles = ['./src/app.ts']; 

const doc = {
  info: {
    title: 'Your API', 
    version: '1.0.0', 
  },
  host: 'localhost:3000', 
  basePath: '/', 
};


swaggerAutogen(outputFile, endpointsFiles, doc);
