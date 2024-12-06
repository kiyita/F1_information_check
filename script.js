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

let driverList = [];

let driverDeroulant = document.createElement("select");

//remplir le array driverList avec les données de l'API
fetch('https://api.openf1.org/v1/drivers?session_key=latest')
  .then(response => response.json())
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      driverList.push(data[i])
    }
    //print tous les noms des pilotes avec console log
    for (var i = 0; i < driverList.length; i++) {
      console.log(driverList[i].full_name);
    }
    afficherListeDeroulante();
    afficherImage();
    fillInfos();
  })
  .catch(error => console.log('error', error));

//afficher la liste déroulante
function afficherListeDeroulante() {
  for (let i = 0; i < driverList.length; i++) {
    let option = document.createElement("option");
    option.value = driverList[i].driver_number;
    option.innerHTML = driverList[i].full_name;
    driverDeroulant.add(option);
  }
  document.getElementById("choice").appendChild(driverDeroulant);  // Ajouter le select 

  // Ajouter un event listener pour afficher l'image et les infos du pilote sélectionné
  driverDeroulant.addEventListener("change", function() {
    afficherImage();
    fillInfos();
  });
}

function afficherImage() {
  const existingImage = document.getElementById("infos").querySelector("img");
  if (existingImage) {
    document.getElementById("infos").removeChild(existingImage);
  }

  var image = document.createElement("img");
  image.alt = "fuck " + driverList[driverDeroulant.selectedIndex].team_name;
  image.src = driverList[driverDeroulant.selectedIndex].headshot_url;
  document.getElementById("infos").appendChild(image);
}

function fillInfos() {
  const infosDiv = document.getElementById("infos");
  const existingInfo = infosDiv.querySelectorAll("p");
  existingInfo.forEach(info => infosDiv.removeChild(info));

  let name = document.createElement("p");
  name.innerHTML = driverList[driverDeroulant.selectedIndex].full_name;

  let number = document.createElement("p");
  number.innerHTML = driverList[driverDeroulant.selectedIndex].driver_number;

  let team = document.createElement("p");
  team.innerHTML = driverList[driverDeroulant.selectedIndex].team_name;

  let acronym = document.createElement("p");
  acronym.innerHTML = driverList[driverDeroulant.selectedIndex].name_acronym;

  let country = document.createElement("p");
  country.innerHTML = getCountryName(driverList[driverDeroulant.selectedIndex].country_code);

  document.getElementById("infos").appendChild(name);
  document.getElementById("infos").appendChild(number);
  document.getElementById("infos").appendChild(team);
  document.getElementById("infos").appendChild(acronym);
  document.getElementById("infos").appendChild(country);
}

// Function pour obtenir le nom du pays à partir du code IOC
function getCountryName(iocCode) {
  return iocCountryMapping[iocCode] || 'Unknown Country';
}

//faire un carré sur un canevas qui fait des aller retour en haut de la pgae


