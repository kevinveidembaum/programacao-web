require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Produtos Avançada',
            version: '1.0.0',
            description: 'Documentação do ecossistema de produtos gerada automaticamente via Swagger e OpenAPI.'
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB conectado!'))
    .catch(err => console.log('Erro:', err));

app.use('/produtos', require('./routes/produtoRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ativo em http://localhost:${PORT}`);
    console.log(`Documentação Swagger acessível em http://localhost:${PORT}/api-docs`);
});