const iocCountryMapping = {
  'AUS': 'Australia',
  'FRA': 'France',
  'CHN': 'China',
  'CAN': 'Canada',
  'NED': 'Netherlands',
  'GBR': 'United Kingdom',
  'USA': 'United States',
  'MON': 'Monaco',
  'ESP': 'Spain',
  'MEX': 'Mexico',
  'GER': 'Germany',
  'JPN': 'Japan',
  'DEN': 'Denmark',
  'FIN': 'Finland',
  'ARG': 'Argentina',
  'THA': 'Thailand',
  'NZL': 'New Zealand',
};

let driversTeams = [];
let driversCountry = [];
let parametersList = ["Team", "Country"]

let driverList = [];
//let driverList = [{full_name: "Lewis Hamilton", driver_number: "44", team_name: "Mercedes", name_acronym: "HAM", country_code: "GBR", headshot_url: "headshot.png"}];//pour les tests hors co

let driverDeroulant = document.createElement("select");

//remplir le array driverList avec les données de l'API, même que dans l'autre script
fetch('https://api.openf1.org/v1/drivers?session_key=latest')
  .then(response => response.json())
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      driverList.push(data[i])
    }
  })
  .catch(error => console.log('error', error));

//afficher la liste déroulante avec les éléments de listList sans doublons
function afficherListeDeroulante(listList, selected) {
  // Réinitialiser la liste déroulante
  driverDeroulant.innerHTML = '';

  // Supprimer les doublons
  let uniqueList = [...new Set(listList)];
  uniqueList.sort();

  // Ajouter les options à la liste déroulante
  for (let i = 0; i < uniqueList.length; i++) {
    let option = document.createElement("option");
    option.value = uniqueList[i];
    option.innerHTML = uniqueList[i];
    driverDeroulant.add(option);
  }
  driverDeroulant.value = "Choose a " + selected; //ne marche pas ??
  document.getElementById("selection").appendChild(driverDeroulant); 

  // Ajouter un event listener pour afficher l'image et les infos du pilote sélectionné
  driverDeroulant.addEventListener("change", function() {
    if (selected === "Team") {
      showSelectedDriverTeam(this.value);
    } 
    else if (selected === "Country") {
      showSelectedDriverCountry(this.value);
    }
  });
}

// Function pour obtenir le nom du pays à partir du code IOC
function getCountryName(iocCode) {
  return iocCountryMapping[iocCode] || 'Unknown Country';
}

function getDriversTeams() {
  // Créer une liste des équipes des pilotes
  driversTeams = [];
  for (let i = 0; i < driverList.length; i++) {
    driversTeams.push(driverList[i].team_name);
  }
  return driversTeams;
}

function getDriversCountry() {
  // Créer une liste des pays des pilotes
  driversCountry = [];
  for (let i = 0; i < driverList.length; i++) {
    driversCountry.push(getCountryName(driverList[i].country_code));
  }
  return driversCountry;
}

function addRadioButtons() {
  // Ajouter les boutons radio pour choisir le paramètre
  let group = document.querySelector("#group"); //récupère le groupe de boutons radio
  group.innerHTML = parametersList.map((parameter) => `<div>
                <input type="radio" name="parameter" value="${parameter}" id="${parameter}">
                <label for="${parameter}">${parameter}</label>
                </div>`).join(' '); //crée les boutons radio en ajoutant littéralement du code dans le HTML
  let radioButtons = document.querySelectorAll('input[name="parameter"]');//récupère les boutons radio
  for(let radioButton of radioButtons){//pour chaque bouton radio
    radioButton.addEventListener('change', showSelected);//ajoute un event listener pour afficher la liste déroulante correspondante
  }        
}

function showSelected(e) {
  // Afficher la liste déroulante correspondante
  removeDrivers();//supprime les pilotes existants
  if (this.checked) {//si le bouton radio est coché
    let selected = this.value;//récupère la valeur du bouton radio
    if (selected === "Team") {
      afficherListeDeroulante(getDriversTeams(), selected);//affiche la liste déroulante des équipes
    } 
    else if (selected === "Country") {
      afficherListeDeroulante(getDriversCountry(), selected);//affiche la liste déroulante des pays
    }
  }
}

function showSelectedDriverCountry(value) {
  removeDrivers();//supprime les pilotes existants
  for (let driver of driverList) {//pour chaque pilote
    if (getCountryName(driver.country_code) === value) {//si le pays du pilote est égal à la valeur sélectionnée
      let country = document.createElement("li");//crée un élément de liste
      country.innerText = driver.full_name;//donne le nom du pilote
      document.getElementById("drivers").appendChild(country);
    }
  }
}

function showSelectedDriverTeam(value) {
  //même chose que pour showSelectedDriverCountry
  removeDrivers();
  for (let driver of driverList) {
    if (driver.team_name === value) {
      let team = document.createElement("li");
      team.innerText = driver.full_name;
      document.getElementById("drivers").appendChild(team);
    }
  }
}

function removeDrivers() {
  //supprime les pilotes existants
  const existingInfo = document.getElementById("drivers").querySelectorAll("li");//récupère les éléments de liste
  existingInfo.forEach(info => document.getElementById("drivers").removeChild(info));//pour chaque élément, le supprime

}

addRadioButtons();
