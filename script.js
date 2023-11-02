const apiUrl = "https://majazocom.github.io/Data/solaris.json";
let currentPlanetData;

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

    // Update other elements with planet data as needed

    // Display data in the .test2 container as well
    const container2 = document.querySelector(".test2");
    container2.querySelector('.name').textContent = planet.name;
    container2.querySelector('.latinName').textContent = planet.latinName;
    

    // Update other elements in .test2 with planet data as needed
  }
}

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
    const container1 = document.querySelector(".test");
    const container2 = document.querySelector(".test2");

    container1.style.display = "none";
    container2.style.display = "block";
  }
});

//Gå tillbaka från infosidan till förstasidan

function goBack() {
    const container1 = document.querySelector(".test");
    const container2 = document.querySelector(".test2");

    container2.style.display = "none";
    container1.style.display = "block";
  };