
document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/user') // Calls the backend endpoint
    .then(res => res.json())
    .then(user => {
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
    .catch(err => {
      console.error("Error loading user data:", err);
    });
});

