document.addEventListener("DOMContentLoaded", function () {
fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // document.getElementById("setup").textContent = `Total items found: ${data.totalItems}`;

    // ✅ Safely extract title and authors
    if (data.items && data.items.length > 0) {
      const book = data.items[0].volumeInfo;
      const title = book.title || "No title";
      const authors = book.authors ? book.authors.join(', ') : "No authors listed";

      document.getElementById("book-fetch").textContent = `"${title}" by ${authors}`;
    } else {
      document.getElementById("book-fetch").textContent = "No books found.";
    }
  })
  .catch(error => {
    console.log(error.message);
    // document.getElementById("setup").textContent = 'Error fetching data.';
    document.getElementById("book-fetch").textContent = '';
  });});