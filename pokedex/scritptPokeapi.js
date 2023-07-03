//Peganbdo os elementos que iremos manipular

const pokemonName = document.querySelector(".pokemon-name");

const pokemonNumber = document.querySelector(".pokemon-number");

const pokemonImage = document.querySelector(".pokemon-image");

const form = document.querySelector("form");
const input = document.querySelector("input");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let pokemonAtual = 1;

//Funcao que ira realizar requisicao na API

async function fetchPokemon(pokemon) { 
//Definir a url de requisicao 

const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;


//Rwalizando a requisicao com fetch ()
const response = await fetch(url);

//Convertendo os dados da requisicao para json ()
const data = await response.json();

//Retornando o pokemon pesquisado 
return data; 

}

//Criar uma funcao para carregar o pokemon no body 

async function renderPokemon(pokemon) { 
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";

    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.src = data['sprites']['versions'] ['generation-v']['black-white'] ['animated'] ['front_default'];
        input.value = "";
        pokemonAtual = data.id;

    }

    else { 
        pokemonImage.computedStyleMap.display = "none";
        pokemonName.innerText = "Não Encontrado" 
    }

}

// Função submit do formulario 
form.addEventListener("submit" , (e) => {
    e.preventDefault();
    let pokemon = input.value;
    renderPokemon(pokemon);
})


//Eventos dos botoes btnNext e btnPrev

btnPrev.addEventListener("click", () => {
    //Se pokemonAtual for maior que  1 
    if (pokemonAtual >1) {
        //Decremena a variavel pokemon atual 
        pokemonAtual --;
        //Chama a funcao renderPokemon como o novo valor de pokemon
        renderPokemon(pokemonAtual); 

    }
})

renderPokemon(pokemonAtual);


btnNext.addEventListener("click", () => {
    //Se pokemonAtual for maior que  1 
    if (pokemonAtual >1) {
        //Decremena a variavel pokemon atual 
        pokemonAtual ++;
        //Chama a funcao renderPokemon como o novo valor de pokemon
        renderPokemon(pokemonAtual); 

    }
})

renderPokemon(pokemonAtual);






