let currentPokemon;
let allPokemon = [];
let noOfPokemon = 20;
let AllLanguage = [];
let APIlength = 'https://pokeapi.co/api/v2/pokemon/';
let VarForGettingAmountOfPokemon = [];
let currentLanguage = 'de';
let cardopend = false;
let languageDropdownOpened = false;
let namesInAllLanguages = [];
let BurgerMenuOpen = false;
let BurgerMenushown;
let errorDetected = false;
let likedPokemon= [];
let searchInBurgerMenu = false;
let activSearch;
//"https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20"

//Fehler Zeile 375 angeblich kann das Bild nicht geladen werden... wird aber trotzdem angezeigt

// Übersetzung Name in versch. Sprachen
// responsive: PokemonSingleCard(Chart)

async function init(){
    startLoading();
    screenwidth();
    await renderPokemon();
    loadPokemon();
    fetchAPILength();
    loadLanguages();
    showLanguage();
    loadLocalStorageForLikedPokemon();
    finishedLoading();// evtl. wieder löschen
}

function startLoading(){
    startLoadingAgain();
    document.getElementById('loadingScreen').innerHTML=`
    <div>
        <img class="loadingScreenPokeball" src="./img/logo.png">
    </div>`;
}

function startLoadingAgain(){
    document.getElementById('loadingScreen').classList.remove('d-none');
}

function finishedLoading(){
    document.getElementById('loadingScreen').classList.add('d-none');
}

function screenwidth(){
   let windowWidth =window.innerWidth;
    if (windowWidth < 500){
        BurgerMenushown = true;
    } else {
        BurgerMenushown = false;
    }
}

function showLanguage(){
    if (currentLanguage == 'de'){
        document.getElementById('language').innerHTML = "deutsch";
    }else if(currentLanguage == 'en'){
        document.getElementById('language').innerHTML = "english";
    }else if(currentLanguage == "fr"){
        document.getElementById('language').innerHTML = "français";
    }
}

function setLanguage(i){
    if (i == 0){
        currentLanguage = 'de';
    }else if(i == 1){
        currentLanguage = 'en';
    }else if(i == 2){
        currentLanguage = 'fr';
    }
    closeBackground();
    initAfterChangingLanguage();
}

async function loadDataInDifferentLanguages(responseAsJson){
//     //https://pokeapi.co/api/v2/pokemon/1/forms/0/url
//     //names -> Namen in verschiedenen Sprachen
    let newUrl = responseAsJson['forms'][0]['url'];
    let responseofNewUrl = await fetch(newUrl);
    let responseAsJsonOfNewUrl = await responseofNewUrl.json();
    let Test = responseAsJsonOfNewUrl['names'];
}

function openAndCloseLanguageDropdown(){
    if(languageDropdownOpened == false){
        openDropdown();
    }else{
        closeDropDown();
    }
    if (cardopend == open){
        document.getElementById('left').classList.add('d-none');
        document.getElementById('right').classList.add('d-none');
    }
}

function openDropdown(){
    languageDropdownOpened = true;
    document.getElementById('background').classList.remove('d-none');
    document.getElementById('allLanguages').classList.remove('d-none');
    document.getElementById('language').classList.add('languageclicked'); 
    document.getElementById('language').classList.add('z-index');
}

function closeDropDown(){
    languageDropdownOpened = false;
    document.getElementById('background').classList.add('d-none');
    document.getElementById('allLanguages').classList.add('d-none');
    document.getElementById('language').classList.remove('languageclicked');
    document.getElementById('language').classList.remove('z-index');
}

function loadLanguages(weight, height){
    if(currentLanguage == 'de'){
        german(weight, height);
    }else if(currentLanguage == 'en'){
        english(weight, height);
    }else if(currentLanguage == 'fr'){
        french(weight, height);
    }
}

function germanphrases(){
    document.getElementById('searchBtn').innerHTML = "suchen";
    document.getElementById('search').placeholder = "Name des Pokemons";
    document.getElementById('language').innerHTML = "Sprache";
    document.getElementById('loadMoreButton').innerHTML ="mehr anzeigen";
    document.getElementById('BurgerMenuOptionLanguage').innerHTML = "Sprache";
    document.getElementById('BurgerMenuOptionSearch').innerHTML = "Suche";

    if (errorDetected == true){
        document.getElementById('errorHeadline').innerHTML = "Fehler!";
        document.getElementById('errormessage').innerHTML = 'Das Pokemon konnte nicht gefunden werden!<br><br>Klick an eine beliebige Stelle um das Fenster zu schließen.';
    }
    if (searchInBurgerMenu == true && activSearch != true){
        document.getElementById('BurgerMenusearchBtn').innerHTML = "suchen";
        document.getElementById('BurgerMenusearch').placeholder = "Name des Pokemons";
    }
}

function englishphrases(){
    document.getElementById('searchBtn').innerHTML = "search";
    document.getElementById('search').placeholder = "name of the Pokemon";
    document.getElementById('language').innerHTML = "language";
    document.getElementById('loadMoreButton').innerHTML ="show more";
    document.getElementById('BurgerMenuOptionLanguage').innerHTML = "language";
    document.getElementById('BurgerMenuOptionSearch').innerHTML = "search";
    if (errorDetected == true){
        document.getElementById('errorHeadline').innerHTML = "ERROR!";
        document.getElementById('errormessage').innerHTML = 'Cound not find the searched Pokemon!<br><br>Click anywhere to close this window.';
    }
    if (searchInBurgerMenu == true && activSearch != true){
        document.getElementById('BurgerMenusearchBtn').innerHTML = "search";
        document.getElementById('BurgerMenusearch').placeholder = "name of the Pokemon";
    }

}

function frenchphrases(){
    document.getElementById('searchBtn').innerHTML = "rechercher";
    document.getElementById('search').placeholder = "Nom du Pokémon";
    document.getElementById('language').innerHTML = "Langue";
    document.getElementById('loadMoreButton').innerHTML ="afficher plus";
    document.getElementById('BurgerMenuOptionLanguage').innerHTML = "Langue";
    document.getElementById('BurgerMenuOptionSearch').innerHTML = "rechercher";
    if (errorDetected == true){
        document.getElementById('errorHeadline').innerHTML = "ERREUR!";
        document.getElementById('errormessage').innerHTML = "Impossible de trouver le Pokémon recherché !<br><br>Cliquez n'importe où pour fermer cette fenêtre.";
    }
    if (searchInBurgerMenu == true && activSearch != true){
        document.getElementById('BurgerMenusearchBtn').innerHTML = "rechercher";
        document.getElementById('BurgerMenusearch').placeholder = "Nom du Pokémon";
    }
}

function german(weight, height){
    germanphrases();
    if (cardopend == true){
        document.getElementById('about').innerHTML ="Infos";
        document.getElementById('stats').innerHTML ="Werte";
        document.getElementById('moves').innerHTML ="Attacken";
        document.getElementById('weight').innerHTML =`Gewicht: ${weight}`;
        document.getElementById('height').innerHTML =`Größe: ${height}`;
    }
}

function english(weight, height){
    englishphrases();
    if (cardopend == true){
        document.getElementById('about').innerHTML ="About";
        document.getElementById('stats').innerHTML ="Stats";
        document.getElementById('moves').innerHTML ="moves";
        document.getElementById('weight').innerHTML =`weight: ${weight}`;
        document.getElementById('height').innerHTML =`height: ${height}`;
    }
}

function french(weight, height){
    frenchphrases();
    if (cardopend == true){
        document.getElementById('about').innerHTML ="Sur";
        document.getElementById('stats').innerHTML ="Valeurs";
        document.getElementById('moves').innerHTML ="Attaques";
        document.getElementById('weight').innerHTML =`Poids: ${weight}`;
        document.getElementById('height').innerHTML =`hauteur: ${height}`;
    }
}

async function fetchAPILength(){
    let response = await fetch(APIlength);
    try{
        let responseAsJson = await response.json();
        VarForGettingAmountOfPokemon.push(responseAsJson);
    }catch(e){
        console.error('error')
    }
}

function initAfterChangingLanguage(){
    startLoading();
    loadPokemon();
    fetchAPILength();
    loadLanguages();
    showLanguage();
    loadLocalStorageForLikedPokemon();
    finishedLoading();
}

async function renderPokemon(){
    for (let i = 1; i <= noOfPokemon; i++){
        let urlForAllPokemon = `https://pokeapi.co/api/v2/pokemon/${i}/?offset=${noOfPokemon}&limit=20`;
        let response = await fetch(urlForAllPokemon);
        try {
            let responseAsJson = await response.json();
            allPokemon.push(responseAsJson);
            loadDataInDifferentLanguages(responseAsJson);
        } catch(e) {
            console.error("error the Pokemon");
        }
    }
}

async function renderMorePokemon(newNoOfPokemon){
    for (let i = noOfPokemon; i <= newNoOfPokemon; i++){
        let urlForAllPokemon = `https://pokeapi.co/api/v2/pokemon/${i+1}/?offset=${noOfPokemon}&limit=20`;
        let response = await fetch(urlForAllPokemon);
        try {
            let responseAsJson = await response.json();
            allPokemon.push(responseAsJson);
        } catch(e) {
            console.error("error loading more Pokemon");
        }
    }
    loadPokemon();
}

function loadMore(){
    let ArrayLength = VarForGettingAmountOfPokemon[0]['count'];
    let newNoOfPokemon = noOfPokemon + 20;
    if (newNoOfPokemon <= ArrayLength){
    newNoOfPokemon = noOfPokemon + 20;
    }else{
        newNoOfPokemon = ArrayLength;
    }
    renderMorePokemon(newNoOfPokemon);
    noOfPokemon += 21;
}

async function loadPokemon(){//hier Sprache einfügen
    startLoadingAgain();//evtl. wieder löschen
    document.getElementById('overview').innerHTML = '';
    for (let i = 0 ; i < allPokemon.length; i++){
        let image = allPokemon[i]['sprites']['other']['dream_world']['front_default'];
        creatPokemonCard(i, image);
        for (let j = 0; j<allPokemon[i]['types'].length; j++){
            loadStats(i, j);
        }
    }
    finishedLoading();//evtl. wieder löschen
}

function creatPokemonCard(i, image){ // hier Sprache einfügen
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

function loadStats(i, j){
    let type = allPokemon[i]['types'][j]['type']['name'];
    document.getElementById(`stats${i}`).innerHTML +=`
    <div id="stat${i}${j}" class="stat">
        ${type}
    </div> 
    `;
    element(type, i, j);
    return i,j;
}

function element(type, i, j){
    if (type == "grass"){
        document.getElementById(`stat${i}${j}`).classList.add('grass');
    }else if (type == "poison"){
        document.getElementById(`stat${i}${j}`).classList.add('poison');
    }else if (type == "fire"){
        document.getElementById(`stat${i}${j}`).classList.add('fire');
    }else if (type == "water"){
        document.getElementById(`stat${i}${j}`).classList.add('water');
    }else if(type == "flying"){
        document.getElementById(`stat${i}${j}`).classList.add('flying');
    }else if(type == "bug"){
        document.getElementById(`stat${i}${j}`).classList.add('bug');
    }else if(type == "electric"){
        document.getElementById(`stat${i}${j}`).classList.add('electric')
    }else if(type == "ground"){
        document.getElementById(`stat${i}${j}`).classList.add('ground')
    }else if(type == "fairy"){
        document.getElementById(`stat${i}${j}`).classList.add('fairy')
    }
}

function safeLocalStorage(i){

    let PokemonAsJSON = JSON.stringify(likedPokemon);
    localStorage.setItem('likedPokemon',PokemonAsJSON);
}

function like(i){
    document.getElementById(`dislike${i}`).classList.add('d-none');
    document.getElementById(`like${i}`).classList.remove('d-none');
    if(likedPokemon.indexOf(i,)!= -1){

    }else{
    likedPokemon.push(i);
    safeLocalStorage(i);
    }
}

function dislike(i){
    document.getElementById(`dislike${i}`).classList.remove('d-none');
    document.getElementById(`like${i}`).classList.add('d-none');
    let position = likedPokemon.indexOf(i,);
    likedPokemon.splice(position, 1);
    safeLocalStorage(i);
}

function openlikedContainer(){
    document.getElementById('background').classList.remove('d-none');
    let screen = document.getElementById('background');
    screen.innerHTML = '';
    screen.innerHTML =`
    <div id="likedPokemonContainer" class="singlePokemonCard likedPokemonContainer">
    </div>
    `;
    loadLocalStorageForLikedPokemon();
    loadLikedPokemonContainerContent();
}

function loadLikedPokemonContainerContent(){
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

function loadLocalStorageForLikedPokemon(){
    let PokemonAsJSON = localStorage.getItem('likedPokemon');
    if (PokemonAsJSON){
        likedPokemon = JSON.parse(PokemonAsJSON);
    }
}

function loadHeartsOfLikesPokemon(opendPokemonCard){
    for (let i = 0; i < likedPokemon.length; i++){
        if(opendPokemonCard == likedPokemon[i]){
            document.getElementById(`dislike${likedPokemon[i]}`).classList.add('d-none');
            document.getElementById(`like${likedPokemon[i]}`).classList.remove('d-none');
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

function openCardFromFav(i){
    closeBackground();
    openCard(i);
}

function openCard(i){
    openBackground(i);
    let input = document.getElementById('singlePokemonCard');
    let image = allPokemon[i]['sprites']['other']['dream_world']['front_default'];
    let name = allPokemon[i]['name'];
    createsinglePokemonCardContent(input, image, name, i);
    loadBackgroundColor(i);
    createAbout(i);
    loadHeartsOfLikesPokemon(i);
    activSearch = false;
    event.stopPropagation();
}

function openSinglePokemonCard(){
    document.getElementById('singlePokemonCard').classList.remove('d-none');
    document.getElementById('language').classList.remove('z-index');
}

function openBackground(i){
    document.getElementById('background').innerHTML = '';
    document.getElementById('background').innerHTML +=`
    <div id="left" class="left" onclick="previousPokemon(${i})">previous</div>
    <div id="right" class="right" onclick="nextPokemon(${i})">next</div>
    `;
    document.getElementById('background').classList.remove('d-none');
    openSinglePokemonCard();
    cardopend = true;
}

function closeBackground(){
    document.getElementById('background').innerHTML = '';
    document.getElementById('background').classList.add('d-none');
    document.getElementById('singlePokemonCard').classList.add('d-none');

    cardopend = false;
    if(languageDropdownOpened = true){
        closeLanguageWindow();
    }
}

function closeLanguageWindow(){
    document.getElementById('background').classList.add('d-none');
    document.getElementById('allLanguages').classList.add('d-none');
    document.getElementById('language').classList.remove('languageclicked');
}

function removeAllLiLines(){
    document.getElementById('about').classList.remove('li-line');
    document.getElementById('stats').classList.remove('li-line');
    document.getElementById('moves').classList.remove('li-line');
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

function creatErrorMessage(){
    errorDetected = true;
    document.getElementById('background').classList.remove('d-none'); // hier Fehlermeldung einfügen
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

function searchForPokemon(search, Pokemonfound){
    for (let j = 0; j < allPokemon.length; j++){
        if(search == allPokemon[j]['name'].toLowerCase()){
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

function openBurgerMenuSearch(){//etwas ändern damit versch. Sprachen angezeigt werden
    document.getElementById('background').classList.remove('d-none');
    document.getElementById('background').innerHTML = '';
    document.getElementById('background').innerHTML += `
    <div id="BurgerMenuChooseSearchContainer" class="BurgerMenuChooseSearchContainer">
        <input type="text" id="BurgerMenusearch" class="BurgerMenusearch" placeholder="name of Pokemon" onclick="event.stopPropagation()">
        <button id="BurgerMenusearchBtn" class="BurgerMenusearchbutton" onclick="searchBurgerMenu()">Suche</button>
    </div>
    `;
    loadLanguages();                  
    openOrCloseBurgerMenu();
}