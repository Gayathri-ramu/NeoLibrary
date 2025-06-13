document.addEventListener('DOMContentLoaded', () => {
  // ---------- Feedback Form ----------
  const feedbackForm = document.getElementById("feedback-form");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("⚠️ Please fill out all feedback fields.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/submit-feedback/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();
        if (result.status === "success") {
          alert("✅ Thank you for your feedback!");
          feedbackForm.reset();
        } else {
          alert("❌ Feedback submission failed.");
        }
      } catch (error) {
        alert("❌ Error connecting to server.");
        console.error(error);
      }
    });
  }

  // ---------- Book Search ----------
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", async function () {
      const bookName = document.getElementById("search-input").value.trim();
      if (!bookName) {
        alert("⚠️ Please enter a book name.");
        return;
      }

      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(bookName)}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.docs && data.docs.length > 0) {
          const firstBook = data.docs[0];
          if (firstBook.key) {
            const readLink = `https://openlibrary.org${firstBook.key}`;
            window.open(readLink, "_blank");
          } else {
            alert("⚠️ Book link not found.");
          }
        } else {
          alert("⚠️ Book not available.");
        }
      } catch (error) {
        alert("❌ Error fetching book.");
        console.error(error);
      }
    });
  }

  // ---------- Borrow Form ----------
  const borrowForm = document.getElementById("borrow-form");
  if (borrowForm) {
    borrowForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const memberID = document.getElementById("member-id").value.trim();
      const bookID = document.getElementById("book-id").value.trim();

      if (!memberID || !bookID) {
        alert("⚠️ Please enter both Member ID and Book ID.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/borrow/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ member_id: memberID, book_id: bookID })
        });

        const result = await response.json();
        if (result.message) {
          alert("✅ " + result.message);
          borrowForm.reset();
        } else {
          alert("❌ Borrow failed.");
        }
      } catch (error) {
        alert("❌ Error submitting borrow request.");
        console.error(error);
      }
    });
  }
});
