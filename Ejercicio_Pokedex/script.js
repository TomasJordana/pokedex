const pokemonCard = document.querySelector('[card]');
const nombrePokemon = document.querySelector('[nombrePokemon]');
const imagenPokemon = document.querySelector('[imagenPokemon]');
const contenedorImagen = document.querySelector('[contenedor]');
const pokemonId = document.querySelector('[pokemonId]');
const tipoPokemon = document.querySelector('[tipoPokemon]');
const estadisticasPokemon = document.querySelector('[estadisticasPokemon]');

const tipoColor = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const buscarPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(datos => datos.json())
        .then(response => renderizarData(response))  
        .catch(err => pokemonInexistente())
}

const renderizarData = datos => {
    const sprite = datos.sprites.front_default;
    const {stats, types} = datos;
    nombrePokemon.textContent = datos.name;
    imagenPokemon.setAttribute('src', sprite);
    pokemonId.textContent = `N° ${datos.id}`;
    colorCard(types);
    pokemonTipo(types);
    pokemonStats(stats);
}

const colorCard= types => {
    const colorUno = tipoColor[types[0].type.name];
    const colorDos = types[1] ? tipoColor[types[1].type.name] : tipoColor.default;
    imagenPokemon.style.background = `radial-gradient(${colorDos} 33%, ${colorUno} 33%)`;
    imagenPokemon.style.backgroundSize = '5px 5px';
}

const pokemonTipo = types => {
    tipoPokemon.innerHTML = "";
    types.forEach(type => {
        const elementoTipo = document.createElement("div");
        elementoTipo.style.color = tipoColor[type.type.name];
        elementoTipo.textContent = type.type.name;
        tipoPokemon.appendChild(elementoTipo);
    });
}

const pokemonStats = stats => {
    estadisticasPokemon.innerHTML = "";
    stats.forEach(stat => {
        const elementoEstadistica = document.createElement("div");
        const nombreEstadistica = document.createElement("div");
        const valorEstadistica = document.createElement("div");
        nombreEstadistica.textContent = stat.stat.name;
        valorEstadistica.textContent = stat.base_stat;
        elementoEstadistica.appendChild(nombreEstadistica);
        elementoEstadistica.appendChild(valorEstadistica);
        estadisticasPokemon.appendChild(elementoEstadistica);
    })
}

const pokemonInexistente = () => {
    nombrePokemon.textContent = `El pokemon no existe`;
    imagenPokemon.setAttribute('src', './img/poke-shadow.png');
    imagenPokemon.style.background = '#fff';
    tipoPokemon.innerHTML = "";
    estadisticasPokemon.innerHTML = "";
    pokemonId.innerHTML = "";
}