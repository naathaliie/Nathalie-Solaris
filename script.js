/* Lägger APIet i en egen variabel som är global */
const apiUrl = "https://majazocom.github.io/Data/solaris.json";

/* Variabel som skall användas för att lagra den data som hämtas från API:et.
Den kommer att uppdateras med den senaste data som hämtas från serven/api:et */
let currentPlanetData;

/* Funktion som använder "fetch" för att hämta data från API:et*/
function getApi(planetName) {
  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to load data");
      }
    })
    .then((data) => {
      currentPlanetData = data;
      displayPlanetInfo(data, planetName);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
/* Funktion kallas på innifrån getAPI och använder dess lokala variablar som parametrar.
Funktionen går igenom data och letar efter om planetName finns.
Om planetName finns innuti data så skall vi lägga till vald info från data till
rätt HTML-element */
function displayPlanetInfo(data, planetName) {
  const planet = data.find((planet) => planet.name === planetName);

  if (planet) {
    document.querySelector('.name').textContent = planet.name;
    document.querySelector('.latinName').textContent = planet.latinName;
    document.querySelector('.desc').textContent = planet.desc;
    document.querySelector('.circumference').textContent = planet.circumference;
    document.querySelector('.distance').textContent = planet.distance;
    document.querySelector('.tempDay').textContent = planet.temp.day;
    document.querySelector('.tempNight').textContent = planet.temp.night;
    document.querySelector('.moons').textContent = planet.moons;

  }
}

//DOMContentLoaded = används för att säkerställa att 
document.addEventListener("DOMContentLoaded", () => {
  const planetButtons = document.querySelectorAll('.planet-button');

  planetButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const planetName = button.getAttribute('data-planet');
      getApi(planetName);
      goToPlanet(planetName);
    });
  });

  function goToPlanet(planetName) {
    const container1 = document.querySelector(".outerContainer");
    const container2 = document.querySelector(".outerContainer2");

    container1.style.display = "none";
    container2.style.display = "block";
  }
});

//Gå tillbaka från infosidan till förstasidan

function goBack() {
    const container1 = document.querySelector(".outerContainer");
    const container2 = document.querySelector(".outerContainer2");

    container2.style.display = "none";
    container1.style.display = "block";
  };