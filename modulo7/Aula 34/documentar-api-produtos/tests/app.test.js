const request = require('supertest');
const app = require('../app');

describe('Testes de Integração - POST /alunos/aprovacao', () => {
    test('Deve retornar aprovado true quando a média for maior ou igual a 6', async () => {
        const resposta = await request(app)
            .post('/alunos/aprovacao')
            .send({ notas: [7, 8, 6] });

        expect(resposta.status).toBe(200);
        expect(resposta.body).toEqual({ media: 7, aprovado: true });
    });

    test('Deve retornar aprovado false quando a média for menor que 6', async () => {
        const resposta = await request(app)
            .post('/alunos/aprovacao')
            .send({ notas: [5, 4, 3] });

        expect(resposta.status).toBe(200);
        expect(resposta.body).toEqual({ media: 4, aprovado: false });
    });

    test('Deve retornar status 400 se o campo notas não for enviado', async () => {
        const resposta = await request(app)
            .post('/alunos/aprovacao')
            .send({});

        expect(resposta.status).toBe(400);
        expect(resposta.body).toHaveProperty('erro');
    });
});