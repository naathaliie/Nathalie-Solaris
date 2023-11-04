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

/* Funktionen kallas på innifrån getAPI och använder dess lokala variablar som parametrar.
Funktionen går igenom "data" och letar efter om "planetName" finns.
Om "planetName" finns innuti "data" så skall vi lägga till vald info från "data" till
rätt HTML-element med querySelector*/
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
//När webbsidan laddas (DOMContentLoaded) så lyssnar koden(addEventListener) efter klick på knappar
//med klassen .planet-button. När en knapp klickas så hämtas data från ett API
// och därefter dirigeras till den valda planeten.
document.addEventListener("DOMContentLoaded", () => {
  const planetButtons = document.querySelectorAll('.planet-button');

  planetButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const planetName = button.getAttribute('data-planet');
      getApi(planetName);
      goToPlanet();
    });
  });

  //Anropas innifrån forEach loopen i eventListener
  //gör att container 1 blir dold (none) och container 2 blir synlig (block)
  //när man klickar på en knapp med klassen .planet-button.
  function goToPlanet() {
    const container1 = document.querySelector(".outerContainer");
    const container2 = document.querySelector(".outerContainer2");

    container1.style.display = "none";
    container2.style.display = "block";
  }
});

//Gå tillbaka
//Via en "onclick" i HTML så blir container 1 synlig (block) och container 2 dold (none)
//när man klickar på "thesun2".

function goBack() {
    const container1 = document.querySelector(".outerContainer");
    const container2 = document.querySelector(".outerContainer2");

    container2.style.display = "none";
    container1.style.display = "block";
  };