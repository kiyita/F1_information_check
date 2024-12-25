//pour la conversion des codes pays (toruver une meilleure méthode plus tard)
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
  'THA': 'Thailand'
};

//crée la liste des pilotes
let driverList = [];
//liste test
//let driverList = [{full_name: "Lewis Hamilton", driver_number: "44", team_name: "Mercedes", name_acronym: "HAM", country_code: "GBR", headshot_url: "headshot.png"}];//pour les tests hors co

let driverDeroulant = document.createElement("select"); //crée la liste déroulante

//remplir le array driverList avec les données de l'API
fetch('https://api.openf1.org/v1/drivers?session_key=latest')
  .then(response => response.json()) //convertir la réponse en json
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      driverList.push(data[i])//remplis la liste avec les pilotes
    }
    afficherListeDeroulante(); //affiche la liste déroulante
    afficherImage(); //affiche l'image du pilote
    fillInfos(); //remplis les infos du pilote
  })
  .catch(error => console.log('error', error));

//afficher la liste déroulante
function afficherListeDeroulante() {
  for (let i = 0; i < driverList.length; i++) { //pour chaque pilote
    let option = document.createElement("option"); //crée une option
    option.value = driverList[i].driver_number; //donne la valeur du pilote
    option.innerHTML = driverList[i].full_name; //donne le nom du pilote
    driverDeroulant.add(option); //ajoute l'option à la liste déroulante
  }
  document.getElementById("choice").appendChild(driverDeroulant);  // Ajouter le select 

  // Ajouter un event listener pour afficher l'image et les infos du pilote sélectionné
  driverDeroulant.addEventListener("change", function() { //quand on change de pilote
    afficherImage();
    fillInfos();
  });
}

function afficherImage() {
  //affiche l'image du pilote sélectionné

  //supprime l'image existante
  const existingImage = document.getElementById("infos").querySelector("img");
  if (existingImage) {
    document.getElementById("photo").removeChild(existingImage);
  }

  var image = document.createElement("img"); //crée une image
  image.alt = "fuck " + driverList[driverDeroulant.selectedIndex].team_name; //crée le texte alternatif
  image.src = driverList[driverDeroulant.selectedIndex].headshot_url; //source de l'image
  document.getElementById("photo").appendChild(image); //ajoute l'image à la section
}

function fillInfos() {
  //Remplis la section avec les informations du pilote

  //supprime les infos précédentes
  const existingInfo = document.getElementById("infos").querySelectorAll("p");
  existingInfo.forEach(info => document.getElementById("infos").removeChild(info));

  //pour chaque info, remplis le span avec l'info en question
  let name = document.getElementById("name");
  name.innerHTML = driverList[driverDeroulant.selectedIndex].full_name;

  let number = document.getElementById("number");
  number.innerHTML = driverList[driverDeroulant.selectedIndex].driver_number;

  let team = document.getElementById("team");
  team.innerHTML = driverList[driverDeroulant.selectedIndex].team_name;

  let acronym = document.getElementById("acronym");
  acronym.innerHTML = driverList[driverDeroulant.selectedIndex].name_acronym;

  let country = document.getElementById("country");
  country.innerHTML = getCountryName(driverList[driverDeroulant.selectedIndex].country_code);
}

// Function pour obtenir le nom du pays à partir du code IOC
function getCountryName(iocCode) {
  return iocCountryMapping[iocCode] || 'Unknown Country';
}

//faire un carré sur un canevas qui fait des aller retour en haut de la page qui sera remplacé plus tard par une voiture
//ajouter sur l'acceuil une radio aléatoire d'un pilote