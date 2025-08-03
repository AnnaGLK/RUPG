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

