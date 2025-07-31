document.getElementById("searchBtn").addEventListener("click", searchBtn);

function searchBtn() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  axios
    .get(`http://localhost:3000/api/catgif?q=${encodeURIComponent(query)}`) // ✅ Query from input
    .then((response) => {
      const iframe = document.getElementById("gifs");
      if (iframe && response.data.embedUrl) {
        iframe.src = response.data.embedUrl;
      } else {
        console.error("No GIF returned.");
      }
    })
    .catch((error) => {
      console.error("Error fetching GIF:", error);
    });
}