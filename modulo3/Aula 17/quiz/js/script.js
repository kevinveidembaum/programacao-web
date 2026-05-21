const bancoPerguntas = [
    {
        pergunta: "Qual palavra-chave declara uma variável que NÃO pode ser reatribuída?",
        alternativas: ["var", "let", "const", "reassign"],
        correta: "const"
    },
    {
        pergunta: "Qual método de array é utilizado para filtrar elementos com base em uma condição?",
        alternativas: [".map()", ".filter()", ".reduce()", ".forEach()"],
        correta: ".filter()"
    },
    {
        pergunta: "Qual é a principal ferramenta do navegador usada para debugar códigos com console.log()?",
        alternativas: ["DevTools", "Elements", "Network", "Sources"],
        correta: "DevTools"
    },
    {
        pergunta: "Como prevenimos o comportamento padrão de recarregar a página ao enviar um formulário?",
        alternativas: ["e.stopPropagation()", "e.preventDefault()", "return false", "form.stop()"],
        correta: "e.preventDefault()"
    },
    {
        pergunta: "Qual API do JavaScript nativo é usada para fazer requisições HTTP assíncronas?",
        alternativas: ["JSON API", "Fetch API", "Local API", "Async API"],
        correta: "Fetch API"
    }
];

const telaInicial = document.querySelector('#tela-inicial');
const telaQuestionario = document.querySelector('#tela-questionario');
const telaResultado = document.querySelector('#tela-resultado');

const btnIniciar = document.querySelector('#btn-iniciar');
const btnReiniciar = document.querySelector('#btn-reiniciar');

const elPerguntaTexto = document.querySelector('#pergunta-texto');
const elContainerAlternativas = document.querySelector('#container-alternativas');
const elNumAtual = document.querySelector('#num-atual');
const elNumTotal = document.querySelector('#num-total');

const elAcertos = document.querySelector('#acertos');
const elTotalFinal = document.querySelector('#total-final');
const elFeedbackMensagem = document.querySelector('#feedback-mensagem');

let perguntasEmbaralhadas = [];
let indicePerguntaAtual = 0;
let pontuacao = 0;

const embaralharArray = (array) => {
    const arrayCopiado = [...array];
    for (let i = arrayCopiado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopiado[i], arrayCopiado[j]] = [arrayCopiado[j], arrayCopiado[i]];
    }
    return arrayCopiado;
};

const iniciarQuiz = () => {
    telaInicial.classList.add('escondido');
    telaResultado.classList.add('escondido');
    telaQuestionario.classList.remove('escondido');
    
    perguntasEmbaralhadas = embaralharArray(bancoPerguntas);
    indicePerguntaAtual = 0;
    pontuacao = 0;
    elNumTotal.textContent = perguntasEmbaralhadas.length;
    
    carregarPergunta();
};

const carregarPergunta = () => {
    elContainerAlternativas.innerHTML = '';
    
    const dadosPergunta = perguntasEmbaralhadas[indicePerguntaAtual];
    elNumAtual.textContent = indicePerguntaAtual + 1;
    elPerguntaTexto.textContent = dadosPergunta.pergunta;

    const alternativasEmbaralhadas = embaralharArray(dadosPergunta.alternativas);

    alternativasEmbaralhadas.forEach((opcao) => {
        const botao = document.createElement('button');
        botao.textContent = opacity = opcao;
        botao.classList.add('btn-opcao');
        botao.addEventListener('click', () => verificarResposta(opcao, dadosPergunta.correta));
        elContainerAlternativas.appendChild(botao);
    });
};

const verificarResposta = (opcaoSelecionada, respostaCorreta) => {
    if (opcaoSelecionada === respostaCorreta) {
        pontuacao++;
    }

    indicePerguntaAtual++;

    if (indicePerguntaAtual < perguntasEmbaralhadas.length) {
        carregarPergunta();
    } else {
        finalizarQuiz();
    }
};

const finalizarQuiz = () => {
    telaQuestionario.classList.add('escondido');
    telaResultado.classList.remove('escondido');

    elAcertos.textContent = pontuacao;
    elTotalFinal.textContent = perguntasEmbaralhadas.length;

    if (pontuacao === perguntasEmbaralhadas.length) {
        elFeedbackMensagem.textContent = "Excelente! Você dominou todos os conceitos fundamentais de JavaScript.";
    } else if (pontuacao >= perguntasEmbaralhadas.length * 0.6) {
        elFeedbackMensagem.textContent = "Bom trabalho! Você teve uma boa pontuação, mas ainda pode revisar alguns pontos.";
    } else {
        elFeedbackMensagem.textContent = "Não desanime! Revise os conceitos do módulo e tente novamente para fixar o aprendizado.";
    }
};

btnIniciar.addEventListener('click', iniciarQuiz);
btnReiniciar.addEventListener('click', iniciarQuiz);