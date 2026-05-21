const inputBusca = document.querySelector('#input-busca');
const btnBusca = document.querySelector('#btn-busca');
const msgErro = document.querySelector('#mensagem-erro');
const pokedexScreen = document.querySelector('#pokedex-screen');

const pokeImg = document.querySelector('#poke-img');
const pokeNome = document.querySelector('#poke-nome');
const pokeId = document.querySelector('#poke-id');
const pokeTipos = document.querySelector('#poke-tipos');

const buscarPokemon = async () => {
    const valorBusca = inputBusca.value.toLowerCase().trim();

    if (!valorBusca) {
        alert('Por favor, digite um nome ou ID!');
        return;
    }

    try {
        msgErro.classList.add('escondido');
        pokedexScreen.classList.add('escondido');
        btnBusca.textContent = '...';
        btnBusca.disabled = true;

        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${valorBusca}`);

        if (!resposta.ok) {
            throw new Error('Pokémon não encontrado.');
        }

        const dados = await resposta.json();
        renderizarPokemon(dados);

    } catch (erro) {
        msgErro.textContent = erro.message;
        msgErro.classList.remove('escondido');
    } finally {
        btnBusca.textContent = 'Buscar';
        btnBusca.disabled = false;
    }
};

const renderizarPokemon = (pokemon) => {
    pokeImg.src = pokemon.sprites.front_default || '';
    pokeImg.alt = pokemon.name;
    pokeNome.textContent = pokemon.name;
    pokeId.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

    pokeTipos.innerHTML = '';
    pokemon.types.forEach(item => {
        const badge = document.createElement('span');
        badge.classList.add('tipo-badge');
        badge.textContent = item.type.name;
        pokeTipos.appendChild(badge);
    });

    pokedexScreen.classList.remove('escondido');
};

btnBusca.addEventListener('click', buscarPokemon);

inputBusca.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarPokemon();
    }
});