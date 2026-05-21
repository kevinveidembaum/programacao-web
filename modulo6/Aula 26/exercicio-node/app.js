const fs = require('fs');
const http = require('http');
const { somar, formatarMensagem } = require('./utils');

const resultadoSoma = somar(15, 25);
const mensagemFormatada = formatarMensagem("FATEC");
const conteudoTxt = `${mensagemFormatada} | Resultado da soma: ${resultadoSoma}`;

fs.writeFileSync('resultado.txt', conteudoTxt, 'utf-8');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Primeiros passos com Node.js</h1><p>Servidor HTTP respondendo com HTML!</p>');
    } else if (req.url === '/json') {
        try {
            const dadosJson = fs.readFileSync('dados.json', 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(dadosJson);
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Erro ao ler o arquivo JSON no servidor.');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Rota não encontrada.');
    }
});

server.listen(3000, () => {
    console.log('Servidor ativo em http://localhost:3000');
});