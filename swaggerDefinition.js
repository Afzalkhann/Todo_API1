const swaggerJSDoc=require('swagger-jsdoc')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Todo API Documentation',
        version: '1.0.0',
        description: 'Documentation for Todo API',
    },
    servers: [
        {
            url: 'http://localhost:3000', 
            description: 'Local server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [], // Reference the security scheme defined above
        },
    ],
};
const options = {
    swaggerDefinition, 
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;