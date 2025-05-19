const swagger =require("swagger-jsdoc")

const options = {
    definition: {
      openapi: `3.0.0`,
      info: {
        title: `Avtosalon loyhasi`,
        version: `1.0.0`,
        description:`Bu avtosalon loyhasining dokumentetsiyasi`
      },
    },
    apis: [`./routes/*.js`],
  };
  const swaggerDocument = swagger(options);
  module.exports = swaggerDocument;
  