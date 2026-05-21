const inputTarefa = document.getElementById("nova-tarefa");
const btnAdicionar = document.getElementById("btn-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");

const adicionarTarefa = () => {
    const textoTarefa = inputTarefa.value.trim();

    if (textoTarefa === "") {
        alert("Por favor, digite uma tarefa válida!");
        return;
    }

    const novoItem = document.createElement("li");
    novoItem.textContent = textoTarefa;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("btn-remover");

    novoItem.appendChild(btnRemover);
    listaTarefas.appendChild(novoItem);

    inputTarefa.value = "";
    inputTarefa.focus();
};

btnAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

listaTarefas.addEventListener("click", (evento) => {
    if (evento.target.tagName === "LI") {
        evento.target.classList.toggle("concluida");
    } else if (evento.target.classList.contains("btn-remover")) {
        const itemParaRemover = evento.target.parentElement;
        listaTarefas.removeChild(itemParaRemover);
    }
});