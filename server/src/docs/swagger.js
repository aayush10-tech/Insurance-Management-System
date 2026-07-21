import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Insurance Management System API",
      version: "1.0.0",
      description: "API documentation for the Insurance Management System",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
  "./src/routes/*.js",
  "./src/docs/routes/*.js",
],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;