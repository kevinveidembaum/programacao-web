const form = document.querySelector('#form-tarefa');
const inputNovaTarefa = document.querySelector('#nova-tarefa');
const lista = document.querySelector('#lista');
const inputBusca = document.querySelector('#busca');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

const salvarNoLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

const renderizarTarefas = () => {
    lista.innerHTML = '';
    const termoBusca = inputBusca.value.toLowerCase();

    tarefas.forEach((tarefa, index) => {
        if (tarefa.texto.toLowerCase().includes(termoBusca)) {
            const li = document.createElement('li');
            li.textContent = tarefa.texto;
            li.dataset.index = index;

            if (tarefa.concluida) {
                li.classList.add('riscada');
            }

            const btnX = document.createElement('button');
            btnX.textContent = 'X';
            btnX.classList.add('btn-deletar');

            li.appendChild(btnX);
            lista.appendChild(li);
        }
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const textoTarefa = inputNovaTarefa.value.trim();

    if (textoTarefa) {
        tarefas.push({ texto: textoTarefa, concluida: false });
        salvarNoLocalStorage();
        renderizarTarefas();
        inputNovaTarefa.value = '';
    }
});

lista.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-deletar')) {
        const index = e.target.parentElement.dataset.index;
        tarefas.splice(index, 1);
        salvarNoLocalStorage();
        renderizarTarefas();
    } else if (e.target.tagName === 'LI') {
        const index = e.target.dataset.index;
        tarefas[index].concluida = !tarefas[index].concluida;
        salvarNoLocalStorage();
        renderizarTarefas();
    }
});

inputBusca.addEventListener('input', renderizarTarefas);

renderizarTarefas();