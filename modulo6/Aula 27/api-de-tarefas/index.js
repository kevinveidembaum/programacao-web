const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const tarefaRoutes = require('./routes/tarefaRoutes');

app.use(express.json());
app.use(logger);

app.use('/tarefas', tarefaRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});