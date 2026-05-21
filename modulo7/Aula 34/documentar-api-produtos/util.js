const calcularMedia = (notas) => {
    if (!Array.isArray(notas) || notas.length === 0) {
        return 0;
    }
    const soma = notas.reduce((acc, nota) => acc + nota, 0);
    return soma / notas.length;
};

module.exports = { calcularMedia };