const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const content = document.getElementById('content')
const contentDetails = document.getElementById('contentDetails')
const content2= document.getElementById('content2')
content2.style.display = "none"
const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" value="${pokemon.number}" onclick="getValue(this.value)">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
    
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function getValue(value){
    let id = value
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.map(pokemon => {
        if(pokemon.number == id){
            content.style.display = "none"
            conteudoFinal = `
                <h1>${pokemon.name}</h1>
                <img class="img2" src="${pokemon.photo}"
                alt="${pokemon.name}">
                
                <div class="detail2">
                    <h4>Habilities:</h2>
                    <ol class="types2">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                            
                </div>
            `
            contentDetails.innerHTML += conteudoFinal
            content2.style.display = "flex"
        }
    })
    })
    
}
