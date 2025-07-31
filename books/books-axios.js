document.addEventListener("DOMContentLoaded", () => {
  function fetchBook(queryType, queryValue) {
    const supportedTypes = {
      title: "intitle",
      author: "inauthor",
      publisher: "inpublisher",
      subject: "subject",
      isbn: "isbn",
    };

    // Check if the queryType is supported
    const prefix = supportedTypes[queryType.toLowerCase()];
    const queryParam = prefix
      ? `${prefix}:${encodeURIComponent(queryValue)}`
      : encodeURIComponent(queryValue); // general search fallback

    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${queryParam}`)
      .then((response) => {
        const data = response.data;
        const container = document.getElementById("book-axios");
        container.innerHTML = ""; // clear previous results

        if (data.items && data.items.length > 0) {
          data.items.forEach((item, index) => {
            const book = item.volumeInfo;
            const title = book.title || "No title";
            const authors = book.authors
              ? book.authors.join(", ")
              : "No authors listed";

            let isbn13 = "Not available";
            if (book.industryIdentifiers) {
              const isbnObj = book.industryIdentifiers.find(
                (id) => id.type === "ISBN_13"
              );
              if (isbnObj) {
                isbn13 = isbnObj.identifier;
              }
            }

            const paragraph = document.createElement("p");
            paragraph.textContent = `#${
              index + 1
            }: "${title}" by ${authors}, ISBN-13: ${isbn13}`;
            container.appendChild(paragraph);
          });
        } else {
          container.textContent = "No books found.";
        }
      })
      .catch((error) => {
        console.error(error.message);
        container.textContent = "";
      });
  }
  // ✅ Example usage:
  //fetchBook("isbn", 9780061741241);
  //fetchBook("title", "The Wise Man's Fears");// Example for title search
  //fetchBook("title", "The Alchemist");// Example for incompleated title search
  // fetchBook("author", "Paulo Coelho"); // Example for author search
  fetchBook("author", "Dale Carnegie");
});
