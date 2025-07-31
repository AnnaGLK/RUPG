document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  axios
    .get(`/api/gif?q=${encodeURIComponent(query)}`)
    .then((response) => {
      const iframe = document.getElementById("gifFrame");
      iframe.src = response.data.embedUrl;
    })
    .catch((err) => {
      console.error("Error fetching GIF:", err);
    });
});