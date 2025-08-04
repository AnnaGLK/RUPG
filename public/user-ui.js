// currentUser
let currentUser = {
  name: "",
  address: "",
  picture: "",
  quote: "",
  pokemon: {},
  meatText: "",
  friends: [],
};

// Fetch user data from the backend
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/user") // Calls the backend endpoint
    .then((res) => res.json())
    .then((user) => {
      // Update the HTML elements with user data
      document.getElementById(
        "logo"
      ).innerHTML = `<img src="${user.picture.large}" alt="User Picture">`;
      document.getElementById("userName").textContent =
        user.name.first + " " + user.name.last;
      document.getElementById(
        "userAdress"
      ).textContent = `${user.location.city}, ${user.location.state}`;
    })
    .catch((err) => {
      console.error("Error loading user data:", err);
    });

  // Fetch 6 random friends
  fetch("https://randomuser.me/api/?results=6")
    .then((res) => res.json())
    .then((data) => {
      const friends = data.results;
      const ul = document.getElementById("friendsList");

      friends.forEach((friend) => {
        const li = document.createElement("li");
        li.textContent = `${friend.name.first} ${friend.name.last}`;
        ul.appendChild(li);
      });
    })
    .catch((err) => {
      console.error("Error loading friends:", err);
    });

  // Kanye quote fetch
  async function loadKanyeQuote() {
    try {
      const response = await fetch("https://api.kanye.rest/");
      if (!response.ok) throw new Error("Failed to fetch Kanye quote");

      const data = await response.json();
      document.getElementById("kanyeQuote").textContent = `"${data.quote}"`;
    } catch (err) {
      console.error("Error loading Kanye quote:", err);
    }
  }

  loadKanyeQuote(); // Call the function to load the quote
});

// Load random Pokémon and Bacon Ipsum text
async function loadRandomPokemon() {
  try {
    // Total number of Pokémon available in the API
    const total = 1025;
    const randomId = Math.floor(Math.random() * total) + 1;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    if (!response.ok) throw new Error("Failed to fetch Pokémon");

    const pokemon = await response.json();

    // Extract name and front image
    const name = pokemon.name;
    const image = pokemon.sprites.front_default;

    // Display in DOM
    document.getElementById("pokemonName").textContent =
      name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById("pokemonImage").src = image;
  } catch (err) {
    console.error("Error loading Pokémon:", err);
  }
}

loadRandomPokemon();

// Fetch Bacon Ipsum text
async function fetchBaconIpsum() {
  try {
    const response = await fetch(
      "https://baconipsum.com/api/?type=meat-and-filler&paras=2&format=text"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    document.getElementById("bacon-text").textContent = text;
  } catch (error) {
    document.getElementById("bacon-text").textContent =
      "Oops! Couldn't fetch meat-flavored info.";
    console.error("Error fetching Bacon Ipsum:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchBaconIpsum);

// Save user data to localStorage
function saveCurrentUser(userData) {
  const stored = JSON.parse(localStorage.getItem("users")) || {};
  stored[userData.name] = userData;
  localStorage.setItem("users", JSON.stringify(stored));
  updateUserDropdown(); // update the dropdown options
}

// load user data from localStorage
function loadSelectedUser() {
  const selectedName = document.getElementById("userDropdown").value;
  const stored = JSON.parse(localStorage.getItem("users")) || {};
  const userData = stored[selectedName];
  if (userData) {
    renderUserPage(userData);
  }
}

// UPDATE DROPDOWN
function updateUserDropdown() {
  const dropdown = document.getElementById("userDropdown");
  const stored = JSON.parse(localStorage.getItem("users")) || {};
  dropdown.innerHTML = ""; // clear existing options

  for (const name in stored) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    dropdown.appendChild(option);
  }
}


// RENDER PAGE FROM USER OBJECT
function renderUserPage(user) {
  document.getElementById("userName").textContent = user.name;
  document.getElementById("userAdress").textContent = user.address;
  document.getElementById("logo").innerHTML = `<img src="${user.picture}" alt="User Picture">`;
  document.getElementById("kanyeQuote").textContent = `"${user.quote}"`;
  document.getElementById("pokemonName").textContent = user.pokemon.name;
  document.getElementById("pokemonImage").src = user.pokemon.image;
  document.getElementById("bacon-text").textContent = user.meatText;

  const ul = document.getElementById("friendsList");
  ul.innerHTML = "";
  user.friends.forEach((friend) => {
    const li = document.createElement("li");
    li.textContent = friend;
    ul.appendChild(li);
  });

  currentUser = user; // update reference
}

// PROMPT BEFORE SAVING
function promptAndSave() {
  const stored = JSON.parse(localStorage.getItem("users")) || {};
  const name = prompt("Enter a name for this user:");
  if (!name) return;
  if (stored[name]) {
    const confirmOverwrite = confirm("That name already exists. Overwrite?");
    if (!confirmOverwrite) return;
  }
  currentUser.name = name;
  saveCurrentUser(currentUser);
}