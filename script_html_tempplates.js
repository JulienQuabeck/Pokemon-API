function creatPokemonCard(i, image){
    document.getElementById('overview').innerHTML += `
    <div id="pokemon${i}" class="pokemon_card" onclick="openCard(${i})">
        <div id="name" class="pokemon_card_name">
            <div>
                ${allPokemon[i]['name']}
            </div>
        #${i+1}
        </div>
        <div id="info" class="info">
            <div id="stats${i}" class="stats">
            </div>
            <div id="image" class=""image>
                <img id="pokemon${i}Img"src="${image}" class="small_image">
            </div>
        </div>
    </div>
    `;
}

function openlikedContainer(){
    document.getElementById('background').classList.remove('d-none');
    let screen = document.getElementById('background');
    screen.innerHTML = '';
    screen.innerHTML =`
    <div id="likedPokemonContainer" class="singlePokemonCard likedPokemonContainer">
    <div class="likePokemonPlaceholderText">no Pokemon marked as Favorit!<div>
    </div>
    `;
    loadLocalStorageForLikedPokemon();
    loadLikedPokemonContainerContent();
}

function loadLikedPokemonContainerContent(){
    document.getElementById('likedPokemonContainer').innerHTML = '';
    if(likedPokemon.length == 0){
    }else {
        for (let i = 0; likedPokemon.length; i++){
            let image = allPokemon[likedPokemon[i]]['sprites']['other']['dream_world']['front_default'];
            document.getElementById('likedPokemonContainer').innerHTML += `
            <div id="pokemon_card_fav${likedPokemon[i]}" class="pokemon_card_fav">
                <div id="pokemon${likedPokemon[i]}" class="pokemon_card" onclick="openCardFromFav(${likedPokemon[i]})">
                    <div id="name" class="pokemon_card_name">
                        <div>
                            ${allPokemon[likedPokemon[i]]['name']}
                        </div>
                    #${likedPokemon[i]+1}
                    </div>
                    <div id="info" class="info">
                        <div id="stats${likedPokemon[i]}" class="stats">
                            
                        </div>
                        <div id="image" class=""image>
                            <img id="pokemon${likedPokemon[i]}Img"src="${image}" class="small_image">
                        </div>
                    </div>
                </div>
            </div>
                `;
            }
        }
}

function createsinglePokemonCardContent(input, image, name, i){
    input.innerHTML = '';
    input.innerHTML = `
    <div class="singlePokemonCardContent">
        <div id="upperpartSinglePokemonCardContent" class="upperpartSinglePokemonCardContent">
            <div id="singlePokemonCardNameContainer" class="singlePokemonCardNameContainer">
                <b>${name}</b>
                <div class="likeContainer">
                    <img class="like" id="dislike${i}" src="./img/notliked.png" onclick="like(${i})">
                    <img class="like d-none" id="like${i}" src="./img/liked.png" onclick="dislike(${i})">
                </div>
            </div>
            <div id="singlePokemonCardImageContaine" class="singlePokemonCardImageContainer">
            <img class="singlePokemonCardImage" src="${image}">
            <div id="left" class="left" onclick="previousPokemon(${i})"><img class="nextPreviousImage" src="./img/previous.png"></div>
            <div id="right" class="right" onclick="nextPokemon(${i})"><img class="nextPreviousImage" src="./img/next.png"></div>
            </div>
        </div>
        <div class="lowerPartSinglePokemonCardContent">
            <div id="singlePokemonCardMenu" class="singlePokemonCardMenu">
            <ul>
                <li id="about" onclick="createAbout(${i})">About</li>
                <li id="stats" onclick="createStats(${i})">Stats</li>
                <li id="moves" onclick="createMoves(${i})">Moves</li>
            </ul>
            </div>
            <hr class="hr">
            <div id="singlePokemonCardMenuContent" class="singlePokemonCardMenuContent">
                <div id="title">
                    <h3 id="headline"></h3>
                </div>
                <div id="singlePokemonContent" class="singlePokemonContent">

                </div>
        </div> 
        </div>
    </div>`;
}

function openBurgerMenuLanguage(){
    document.getElementById('background').classList.remove('d-none');
    document.getElementById('background').innerHTML = '';
    document.getElementById('background').innerHTML += `
    <div id="BurgerMenuChooseLanguageContainer" class="BurgerMenuChooseLanguageContainer">
        <div onclick="setLanguage(0)">deutsch</div>
        <div onclick="setLanguage(1)">english</div>
        <div onclick="setLanguage(2)">français</div>
    </div>    
    `;
    openOrCloseBurgerMenu();
}

function openBurgerMenuSearch(){
    document.getElementById('background').classList.remove('d-none');
    document.getElementById('background').innerHTML = '';
    document.getElementById('background').innerHTML += `
    <div id="BurgerMenuChooseSearchContainer" class="BurgerMenuChooseSearchContainer">
        <input type="text" id="BurgerMenusearch" class="BurgerMenusearch" placeholder="name of Pokemon" onclick="event.stopPropagation()">
        <button id="BurgerMenusearchBtn" class="BurgerMenusearchbutton" onclick="searchBurgerMenu()">Suche</button>
    </div>
    `;
    searchInBurgerMenu = true;
    loadLanguages();                  
    openOrCloseBurgerMenu();
}

function creatErrorMessage(){
    errorDetected = true;
    document.getElementById('background').classList.remove('d-none');
    let errorMessage = document.getElementById('background');
    errorMessage.innerHTML = ``;
    errorMessage.innerHTML += `
    <div id="errorWindow" class="errorWindow">
        <div id="errorImage" class="errorImage">
        <img src="./img/error.png">
        </div>
        <div id="errorContent" class="errorContent">
            <div id="errorHeadline" class="errorHeadline">
            ERROR!
            </div>
            <div id="errormessage" class="errormessage">
            Cound not find the searched Pokemon!<br><br>
            Click anywhere to close this window.
            </div>
        </div>
    </div>
    `;
    loadLanguages();
}

function createAbout(i){
    removeAllLiLines();
    let weight = allPokemon[i]['weight'];
    let height = allPokemon[i]['height'];
    let id = allPokemon[i]['id'];
    let headline = document.getElementById('headline');
    let content = document.getElementById('singlePokemonContent');
    content.classList.remove('singlePokemonContentScollbar');
    content.innerHTML = '';
    headline.innerHTML = 'About';
    content.innerHTML = `
    <div id="id">id: ${id} </div>
    <div id="weight">weight: ${weight}</div>
    <div id="height">height: ${height}</div>
    `;
    document.getElementById('about').classList.add('li-line');
    loadLanguages(weight, height);
}

function createChart(hp, attack, defense, specialAttack, specialDefense, speed){
    const ctx = document.getElementById(`myChart`);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['hp', 'attack', 'defense', 'special attack','specialDefense', 'speed'],
        datasets: [{
                    axis: 'y',
          label: 'All Data',
          data: [hp, attack, defense, specialAttack, specialDefense, speed],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}

function loadstatsforChart(i){
    let hp = allPokemon[i]['stats'][0]['base_stat'];
    let attack = allPokemon[i]['stats'][1]['base_stat'];
    let defense = allPokemon[i]['stats'][2]['base_stat'];
    let specialAttack = allPokemon[i]['stats'][3]['base_stat'];
    let specialDefense = allPokemon[i]['stats'][4]['base_stat'];
    let speed = allPokemon[i]['stats'][5]['base_stat'];
    createChart(hp, attack, defense, specialAttack, specialDefense, speed, i); 
}

function ClearContainersForCharts(){
    let content = document.getElementById('singlePokemonContent');
    content.classList.remove('singlePokemonContentScollbar');
    let headline = document.getElementById('headline');
    headline.innerHTML = 'Stats';
    content.innerHTML = '';
    document.getElementById('stats').classList.add('li-line');

    document.getElementById('singlePokemonContent').innerHTML = '';
    document.getElementById('singlePokemonContent').innerHTML = `
    <div class="chartContainer">
        <canvas id="myChart" class="chart"></canvas>
    </div>
    `;
}

function createStats(i){
    removeAllLiLines();
    ClearContainersForCharts();
    loadstatsforChart(i);
}

function createMoves(i){
    removeAllLiLines();
    let content = document.getElementById('singlePokemonContent');
    content.classList.add('singlePokemonContentScollbar');
    let headline = document.getElementById('headline');
    headline.innerHTML = 'Moves';
    content.innerHTML = '<ul>';
    content.innerHTML += listMoves(i);
    content.innerHTML += '</ul>';
    document.getElementById('moves').classList.add('li-line');
}

function listMoves(i){
    let moves='';
        for (j = 0; j< allPokemon[i]['moves'].length;j++){
            moves += `
            <li class="liste">
            ${allPokemon[i]['moves'][j]['move']['name']}
            </li>`;
        }
    return moves;
}

function searchForPokemon(search, Pokemonfound){
    for (let j = 0; j < allPokemon.length; j++){
            if(allPokemon[j]['name'].toLowerCase().includes(search)){
            Pokemonfound = true;
            openCard(j);
        }
    }
    if (Pokemonfound == false){
        creatErrorMessage();
    }
    document.getElementById('search').value = '';
}

function searchBurgerMenu(){
    searchInBurgerMenu = true;
    activSearch = true;
    BurgerMenuSearch();
}

function BurgerMenuSearch(){
    searchInBurgerMenu = true;
    let search = document.getElementById('BurgerMenusearch').value;
    let Pokemonfound = false;
    search = search.toLowerCase();
    searchForPokemon(search, Pokemonfound);
}

function search(){
    let search = document.getElementById('search').value;
    let Pokemonfound = false;
    activSearch = true;
    search = search.toLowerCase();
    searchForPokemon(search, Pokemonfound);
}

function loadBackgroundColor(i){
    let typ = allPokemon[i]['types'][0]['type']['name'];
    if (typ == 'grass'){
        document.getElementById('upperpartSinglePokemonCardContent').classList.add('grass');
    }else if (typ == "poison"){
        document.getElementById(`upperpartSinglePokemonCardContent`).classList.add('poison');
    }else if (typ == "fire"){
        document.getElementById(`upperpartSinglePokemonCardContent`).classList.add('fire');
    }else if (typ == "water"){
        document.getElementById(`upperpartSinglePokemonCardContent`).classList.add('water');
    }else if(typ == "flying"){
        document.getElementById(`upperpartSinglePokemonCardContent`).classList.add('flying');
    }else if(typ == "bug"){
        document.getElementById(`upperpartSinglePokemonCardContent`).classList.add('bug');
    }
}

function previousPokemon(i){
    i--;
    if (i == -1){
        i = noOfPokemon-1;
    }
    openCard(i);
    event.stopPropagation();
}

function nextPokemon(i){
    i++;
    if (i == noOfPokemon){
        i = 0;
    }
    openCard(i);
    event.stopPropagation();
}

function openOrCloseBurgerMenu(){
    if (BurgerMenuOpen == false){
        document.getElementById('BurgerMenu').classList.remove('d-none');
        BurgerMenuOpen = true;
    }else{
        document.getElementById('BurgerMenu').classList.add('d-none');
        BurgerMenuOpen = false;
    }
}