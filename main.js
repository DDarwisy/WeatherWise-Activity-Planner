// Places for hiking by state
const hikingPlaces = {
  Johor: [
    { name: "Gunung Pulai", location: "Kulai" },
    { name: "Gunung Ledang (Mount Ophir)", location: "Tangkak" },
    { name: "Bukit Serene", location: "Johor Bahru" }
  ],
  Kedah: [
    { name: "Gunung Jerai", location: "Kuala Muda" },
    { name: "Bukit Wang", location: "Jitra" },
    { name: "Lata Bukit Hijau", location: "Kulim" }
  ],
  Kelantan: [
    { name: "Gunung Stong", location: "Dabong" },
    { name: "Gunung Ayam", location: "Dabong" },
    { name: "Bukit Bakar Recreational Forest", location: "Machang" }
  ],
  "Kuala Lumpur": [
    { name: "Bukit Gasing", location: "Kuala Lumpur" },
    { name: "Bukit Tabur (East & West)", location: "Kuala Lumpur" },
    { name: "KL Forest Eco Park", location: "Kuala Lumpur" }
  ],
  Malacca: [
    { name: "Bukit Batu Lebah", location: "Alor Gajah" },
    { name: "Bukit Beruang", location: "Bukit Beruang" },
    { name: "Bukit Tampin", location: "Tampin" }
  ],
  "Negeri Sembilan": [
    { name: "Gunung Datuk", location: "Rembau" },
    { name: "Gunung Angsi", location: "Seremban" },
    { name: "Bukit Broga", location: "Semenyih" }
  ],
  Pahang: [
    { name: "Gunung Tahan", location: "Kuala Tahan" },
    { name: "Cameron Highlands Mossy Forest", location: "Cameron Highlands" },
    { name: "Fraser's Hill Pine Tree Trail", location: "Raub" }
  ],
  Penang: [
    { name: "Penang Hill", location: "George Town" },
    { name: "Bukit Mertajam Recreational Forest", location: "Bukit Mertajam" },
    { name: "Teluk Bahang National Park", location: "George Town" }
  ],
  Perak: [
    { name: "Gunung Korbu", location: "Kinta" },
    { name: "Bukit Kledang", location: "Ipoh" },
    { name: "Gua Tempurung", location: "Gopeng" }
  ],
  Perlis: [
    { name: "Bukit Keteri", location: "Kangar" },
    { name: "Wang Kelian", location: "Perlis" },
    { name: "Bukit Chabang", location: "Kangar" }
  ],
  Sabah: [
    { name: "Mount Kinabalu", location: "Kota Kinabalu" },
    { name: "Crocker Range", location: "Kota Kinabalu" },
    { name: "Bukit Perahu", location: "Tamparuli" }
  ],
  Sarawak: [
    { name: "Mount Santubong", location: "Kuching" },
    { name: "Bako National Park", location: "Kuching" },
    { name: "Lambir Hills National Park", location: "Miri" }
  ],
  Selangor: [
    { name: "Bukit Broga", location: "Semenyih" },
    { name: "Gunung Nuang", location: "Hulu Langat" },
    { name: "Kanching Rainforest Waterfall", location: "Rawang" }
  ],
  Terengganu: [
    { name: "Gunung Tebu", location: "Besut" },
    { name: "Sekayu Waterfall", location: "Kuala Berang" },
    { name: "Bukit Maras", location: "Kuala Terengganu" }
  ]
};

// Places for snorkeling by state
const snorkelingPlaces = {
  Johor: [
    { name: "Pulau Rawa", location: "Mersing" },
    { name: "Pulau Sibu", location: "Mersing" }
  ],
  Kedah: [
    { name: "Pulau Payar Marine Park", location: "Langkawi" }
  ],
  Kelantan: [
    { name: "Pantai Irama", location: "Bachok" }
  ],
  Malacca: [
    { name: "Pulau Undan", location: "Melaka" }
  ],
  Pahang: [
    { name: "Pulau Tioman", location: "Rompin" }
  ],
  Penang: [
    { name: "Pulau Kendi", location: "Penang" }
  ],
  Perak: [
    { name: "Pulau Pangkor", location: "Pangkor Island" }
  ],
  Selangor: [
    { name: "Pulau Ketam", location: "Port Klang" }
  ],
  Terengganu: [
    { name: "Pulau Redang", location: "Kuala Nerus" },
    { name: "Pulau Perhentian", location: "Besut" },
    { name: "Pulau Kapas", location: "Marang" }
  ],
  Sabah: [
    { name: "Pulau Sipadan", location: "Semporna" },
    { name: "Pulau Mabul", location: "Semporna" },
    { name: "Tunku Abdul Rahman Marine Park", location: "Kota Kinabalu" }
  ],
  Sarawak: [
    { name: "Satang Island", location: "Kuching" }
  ],
  Labuan: [
    { name: "Pulau Papan", location: "Labuan Island" }
  ]
};

// When the user clicks the search button, find matching places based on input
document.getElementById('searchBtn').addEventListener('click', function() {
  const input = document.getElementById('stateInput').value.trim().toLowerCase();
  const activity = document.getElementById('activityType').value;

  let places;
  if (activity === 'hiking') {
    places = hikingPlaces;
  } else {
    places = snorkelingPlaces;
  }

  // Match the user input with available states
  const state = Object.keys(places).find(function(key) {
    return key.toLowerCase() === input;
  });

  const foundPlaces = places[state] || [];
  const placesList = document.getElementById('placesList');
  const weatherSection = document.getElementById('weatherForecast');

  // Clear the previous search results
  placesList.innerHTML = '';
  weatherSection.classList.add('hidden'); // Hide weather info

  // Display each found place in the list
  foundPlaces.forEach(function(place) {
    const placeDiv = document.createElement('div');
    placeDiv.innerHTML = `
      <h2>${place.name}</h2>
      <p>Location: ${place.location}</p>
      <button onclick="showWeather('${place.location}')">Show Forecast</button>
      <button onclick="saveToFavorites('${place.name}', '${place.location}')">Add to Favorites</button>
    `;
    placesList.appendChild(placeDiv);
  });

  // If no places are found, display a message
  if (foundPlaces.length == 0) {
    placesList.innerHTML = `<p>No places found for "${input}".</p>`;
  }
});

// Function to fetch and show weather forecast for a location with recommendations
function showWeather(location) {
  const apiKey = '32804b24a847407391c53709241010';
  const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const forecast = data.forecast.forecastday;
      const weatherSection = document.getElementById('weatherForecast');
      const currentTemp = data.current.temp_c;
      const windSpeed = data.current.wind_kph;
      const rainChance = forecast[0].day.daily_chance_of_rain;

      // Prepare weather details
      let weatherInfo = `
        <h3>Weather in ${data.location.name}, ${data.location.region}, ${data.location.country}</h3>
        <p>Local Time: ${data.location.localtime}</p>
        <p>Temp: ${currentTemp}°C, ${data.current.condition.text}</p>
        <p>Wind: ${windSpeed} kph | Humidity: ${data.current.humidity}%</p>
      `;

      // Add recommendations based on activity type
      const activityType = document.getElementById('activityType').value;
      let recommendation = getRecommendation(activityType, currentTemp, windSpeed, rainChance);

      // Display the recommendation
      weatherInfo += `<p><strong>Recommendation:</strong> ${recommendation}</p>`;

      // Add forecast for upcoming days
      forecast.forEach(function(day) {
        weatherInfo += `
          <div class="weather-day">
            <img src="https:${day.day.condition.icon}" alt="Weather icon">
            <div>
              <h4>${day.date}</h4>
              <p>${day.day.mintemp_c}°C - ${day.day.maxtemp_c}°C, ${day.day.condition.text}</p>
              <p>Rain: ${day.day.daily_chance_of_rain}% | Snow: ${day.day.daily_chance_of_snow}%</p>
            </div>
          </div>
        `;
      });

      // Display the weather information
      weatherSection.innerHTML = weatherInfo;
      weatherSection.classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
    });
}

// Function to generate recommendations based on weather data
function getRecommendation(activityType, temp, wind, rainChance) {
  if (activityType === 'hiking') {
    if (temp >= 15 && temp <= 30 && wind < 25 && rainChance < 30) {
      return 'Great day for hiking! Conditions are perfect.';
    } else if (wind >= 25) {
      return 'It might be too windy for hiking. Be cautious!';
    } else if (rainChance >= 30) {
      return 'Rain expected. Consider rescheduling your hike.';
    } else {
      return 'Conditions are okay, but check the forecast for sudden changes.';
    }
  } else if (activityType === 'snorkeling') {
    if (temp > 25 && wind < 15 && rainChance < 20) {
      return 'Perfect conditions for snorkeling!';
    } else if (wind >= 15) {
      return 'The sea might be rough. Be careful if you go snorkeling.';
    } else if (rainChance >= 20) {
      return 'Rain expected. Snorkeling may not be ideal today.';
    } else {
      return 'Conditions are okay, but keep an eye on the weather.';
    }
  }
}

// Function to add places to favorite lists
function saveToFavorites(name, location) {
  let favoriteLists = JSON.parse(localStorage.getItem('favoriteLists')) || {};
  const listNames = Object.keys(favoriteLists);

  // Create a modal to select a list
  const modal = document.createElement('div');
  modal.className = 'modal';

  const selectList = document.createElement('select');
  selectList.innerHTML = `<option value="">Select a list</option>`;
  listNames.forEach(function(listName) {
    const option = document.createElement('option');
    option.value = listName;
    option.textContent = listName;
    selectList.appendChild(option);
  });

  const addButton = document.createElement('button');
  addButton.textContent = 'Add';

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';

  // Add event listeners to buttons
  addButton.onclick = function() {
    const selectedList = selectList.value;
    if (!selectedList) {
      alert('Please select a list.');
      return;
    }

    if (!favoriteLists[selectedList]) {
      favoriteLists[selectedList] = [];
    }

    const alreadyAdded = favoriteLists[selectedList].some(function(place) {
      return place.name == name && place.location == location;
    });

    if (alreadyAdded) {
      alert(`${name} is already in "${selectedList}".`);
    } else {
      favoriteLists[selectedList].push({ name, location });
      localStorage.setItem('favoriteLists', JSON.stringify(favoriteLists));
      alert(`${name} added to "${selectedList}"!`);
    }

    document.body.removeChild(modal); // Close modal
  };

  cancelButton.onclick = function() {
    document.body.removeChild(modal); // Close modal
  };

  // Add elements to the modal and display it
  modal.appendChild(selectList);
  modal.appendChild(addButton);
  modal.appendChild(cancelButton);
  document.body.appendChild(modal);
}
