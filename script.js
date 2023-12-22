let currentPokemon;
let allPokemon = [];
let noOfPokemon = 20;
let APIlength = 'https://pokeapi.co/api/v2/pokemon/';
let VarForGettingAmountOfPokemon = [];
let currentLanguage = 'de';
let cardopend = false;
let languageDropdownOpened = false;
let BurgerMenuOpen = false;
let BurgerMenushown;
let errorDetected = false;
let likedPokemon= [];
let searchInBurgerMenu = false;
let activSearch =false;

async function init(){
    await renderPokemon();
    initAfterChangingLanguage();
    screenwidth();
}

function startLoading(){
    loading();
    document.getElementById('loadingScreen').innerHTML=`
    <div>
        <img id="loadingScreenPokeball" class="loadingScreenPokeball" src="./img/logo.png">
    </div>`;
}

function loading(){
    document.getElementById('loadingScreen').classList.toggle('d-none');
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

function setLanguage(i){
    searchInBurgerMenu = false;
    if (i == 0){
        currentLanguage = 'de';
        document.getElementById('language').innerHTML = "deutsch";
    }else if(i == 1){
        currentLanguage = 'en';
        document.getElementById('language').innerHTML = "english";
    }else if(i == 2){
        currentLanguage = 'fr';
        document.getElementById('language').innerHTML = "français";
    }
    closeBackground();
    initAfterChangingLanguage();
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

function openDropdownBackground(){ 
    document.getElementById('background').classList.toggle('d-none');
}

function openDropdown(){
    languageDropdownOpened = true;
    openDropdownBackground();
    document.getElementById('allLanguages').classList.toggle('d-none');
}

function closeDropDown(){
    languageDropdownOpened = false;
    openDropdownBackground();
    document.getElementById('allLanguages').classList.add('d-none');
    document.getElementById('language').classList.remove('languageclicked');
    document.getElementById('language').classList.remove('z-index');
}

function loadLanguages(weight, height){//anpassen!!!
    if(currentLanguage == 'de'){
        german(weight, height);
    }else if(currentLanguage == 'en'){
        english(weight, height);
    }else if(currentLanguage == 'fr'){
        french(weight, height);
    }
}

function germanphrases(){//anpassen
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

function englishphrases(){//anpassen
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

function frenchphrases(){//anpassen
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

function german(weight, height){//anpassen
    germanphrases();
    if (cardopend == true){
        document.getElementById('about').innerHTML ="Infos";
        document.getElementById('stats').innerHTML ="Werte";
        document.getElementById('moves').innerHTML ="Attacken";
        document.getElementById('weight').innerHTML =`Gewicht: ${weight}`;
        document.getElementById('height').innerHTML =`Größe: ${height}`;
    }
}

function english(weight, height){//anpassen
    englishphrases();
    if (cardopend == true){
        document.getElementById('about').innerHTML ="About";
        document.getElementById('stats').innerHTML ="Stats";
        document.getElementById('moves').innerHTML ="moves";
        document.getElementById('weight').innerHTML =`weight: ${weight}`;
        document.getElementById('height').innerHTML =`height: ${height}`;
    }
}

function french(weight, height){//anpassen
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
    loadLocalStorageForLikedPokemon();
    finishedLoading();
}

async function renderPokemon(){
    for (let i = 1; i <= noOfPokemon; i++){
        let urlForAllPokemon = `https://pokeapi.co/api/v2/pokemon/${i}/?offset=${noOfPokemon}&limit=20`;
        let response = await fetch(urlForAllPokemon);
        try {
            let responseAsJson = await response.json();
            DataForDifferentLanguages = responseAsJson;
            allPokemon.push(responseAsJson);
        } catch(e) {
            console.error("error loading the Pokemon");
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
    // startLoadingAgain();
    loading();
    if (newNoOfPokemon <= ArrayLength){
    newNoOfPokemon = noOfPokemon + 20;
    }else{
        newNoOfPokemon = ArrayLength;
    }
    renderMorePokemon(newNoOfPokemon);
    noOfPokemon += 21;
}

async function loadPokemon(){
    document.getElementById('overview').innerHTML = '';
    for (let i = 0 ; i < allPokemon.length; i++){
        let image = allPokemon[i]['sprites']['other']['dream_world']['front_default'];
        creatPokemonCard(i, image);
        for (let j = 0; j<allPokemon[i]['types'].length; j++){
            loadStats(i, j);
        }
    }
    loading();
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

function openBackground(){
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
    languageDropdownOpened = false;
}

function removeAllLiLines(){
    document.getElementById('about').classList.remove('li-line');
    document.getElementById('stats').classList.remove('li-line');
    document.getElementById('moves').classList.remove('li-line');
}