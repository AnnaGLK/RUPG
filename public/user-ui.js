// Promise.all
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

 const pokemonId = Math.floor(Math.random() * 1025) + 1;
 
   Promise.all([
    fetch("/api/user").then(res => res.json()),
    fetch("https://api.kanye.rest/").then(res => res.json()),
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(res => res.json()),
    fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=2&format=text").then(res => res.text()),
    fetch("https://randomuser.me/api/?results=6").then(res => res.json())
  ])
    .then(([user, kanye, pokemon, baconText, friendsData]) => {
      const fullName = `${user.name.first} ${user.name.last}`;
      const address = `${user.location.city}, ${user.location.state}`;
      const image = pokemon.sprites.front_default;
      const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

      document.getElementById("userName").textContent = fullName;
      document.getElementById("userAdress").textContent = address;
      document.getElementById("logo").innerHTML = `<img src="${user.picture.large}" alt="User Picture">`;
      document.getElementById("kanyeQuote").textContent = `"${kanye.quote}"`;
      document.getElementById("pokemonName").textContent = pokemonName;
      document.getElementById("pokemonImage").src = image;
      document.getElementById("baconText").textContent = baconText;

      const friendsList = document.getElementById("friendsList");
      friendsList.innerHTML = "";
      const friendNames = friendsData.results.map(f => `${f.name.first} ${f.name.last}`);
      friendNames.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        friendsList.appendChild(li);
      });

      // Apply gender-based background
      const genderElements = document.querySelectorAll(".gender");
      genderElements.forEach(el => {
        el.style.backgroundColor = user.gender === "male" ? "lightblue" : "lightpink";
      });
      
      currentUser = {
        name: fullName,
        address,
        picture: user.picture.large,
        quote: kanye.quote,
        pokemon: { name: pokemonName, image },
        meatText: baconText,
        friends: friendNames
      };
    })
    .catch(error => {
      console.error("Error loading user profile:", error);
      document.getElementById("userName").textContent = "Failed to load user.";
      document.getElementById("userAdress").textContent = "Check API connection.";
      document.getElementById("kanyeQuote").textContent = "No quote available.";
      document.getElementById("baconText").textContent = "No bacon ipsum available.";
    });
});


function promptAndSave() {
  const stored = JSON.parse(localStorage.getItem("users")) || {};
  const name = prompt("Enter a name to save this user:");
  if (!name) return;

  if (stored[name]) {
    const confirmOverwrite = confirm("That name already exists. Overwrite?");
    if (!confirmOverwrite) return;
  }

  currentUser.name = name;
  saveCurrentUser(currentUser);
  updateUserDropdown(); // <- Update dropdown after saving
}

// Save user data to localStorage
function saveCurrentUser(userData) {
  const stored = JSON.parse(localStorage.getItem("users")) || {};
  stored[userData.name] = userData;
  localStorage.setItem("users", JSON.stringify(stored));
 
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
  if (!dropdown) return;
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
