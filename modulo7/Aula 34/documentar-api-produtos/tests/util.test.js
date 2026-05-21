const { calcularMedia } = require('../utils');

describe('Testes Unitários - calcularMedia', () => {
    test('Deve calcular a média de um array de notas corretamente', () => {
        expect(calcularMedia([8, 7, 9])).toBe(8);
    });

    test('Deve retornar 0 se o array de notas estiver vazio', () => {
        expect(calcularMedia([])).toBe(0);
    });

    test('Deve retornar 0 se o parâmetro não for um array', () => {
        expect(calcularMedia(null)).toBe(0);
    });
});