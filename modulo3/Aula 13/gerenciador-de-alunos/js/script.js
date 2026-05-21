const alunosIniciais = [
    { nome: "Ana", nota1: 8.5, nota2: 7.5 },
    { nome: "Carlos", nota1: 5.0, nota2: 6.0 },
    { nome: "Julia", nota1: 9.0, nota2: 9.4 },
    { nome: "Pedro", nota1: 4.0, nota2: 5.0 },
    { nome: "Sofia", nota1: 7.0, nota2: 8.0 }
];

const calcularMedia = (nota1, nota2) => (nota1 + nota2) / 2;

const alunosComMedia = alunosIniciais.map(aluno => ({
    ...aluno,
    media: calcularMedia(aluno.nota1, aluno.nota2)
}));

const aprovados = alunosComMedia.filter(aluno => aluno.media >= 6);
const reprovados = alunosComMedia.filter(aluno => aluno.media < 6);

const somaDasMedias = alunosComMedia.reduce((acc, aluno) => acc + aluno.media, 0);
const mediaGeralTurma = somaDasMedias / alunosComMedia.length;

const alunosOrdenados = [...alunosComMedia].sort((a, b) => b.media - a.media);

console.log("--- RELATÓRIO GERAL DA TURMA ---");
console.log(`Média Geral da Turma: ${mediaGeralTurma.toFixed(2)}`);

console.log("\n--- ALUNOS APROVADOS ---");
aprovados.forEach(aluno => {
    console.log(`Nome: ${aluno.nome} | Média: ${aluno.media.toFixed(2)}`);
});

console.log("\n--- ALUNOS REPROVADOS ---");
reprovados.forEach(aluno => {
    console.log(`Nome: ${aluno.nome} | Média: ${aluno.media.toFixed(2)}`);
});

console.log("\n--- RANKING DOS ALUNOS (ORDENADO POR MÉDIA) ---");
alunosOrdenados.forEach((aluno, index) => {
    console.log(`${index + 1}º: ${aluno.nome} - Média: ${aluno.media.toFixed(2)}`);
});