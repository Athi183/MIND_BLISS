function redirectToLogin() {
    window.location.href = "login.html";
}

function redirectToHome() {
    window.location.href = "home.html";
}

// Generate a new quote randomly
function newQuote() {
    const quotes = [
        "Happiness depends upon ourselves. – Aristotle",
        "The purpose of our lives is to be happy. – Dalai Lama",
        "Do what you can, with what you have, where you are. – Theodore Roosevelt",
        "Be happy with what you have while working for what you want. – Helen Keller"
    ];
    document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];
}

// Save gratitude journal entry in localStorage
function saveEntry() {
    let entry = document.getElementById("journal").value.trim();
    if (!entry) {
        alert("Write something before saving!");
        return;
    }

    let username = localStorage.getItem("loggedInUser");
    if (!username) {
        alert("Please log in first!");
        return;
    }

    let userEntries = JSON.parse(localStorage.getItem(username + "_entries")) || [];
    userEntries.push(entry);
    localStorage.setItem(username + "_entries", JSON.stringify(userEntries));

    alert("Gratitude entry saved!");
    document.getElementById("journal").value = "";
    displayEntries();
}

// Display saved journal entries
function displayEntries() {
    let username = localStorage.getItem("loggedInUser");
    if (!username) return;

    let userEntries = JSON.parse(localStorage.getItem(username + "_entries")) || [];
    let entriesContainer = document.getElementById("entries");

    if (entriesContainer) {
        entriesContainer.innerHTML = "";
        userEntries.forEach(entry => {
            let entryElement = document.createElement("p");
            entryElement.textContent = "• " + entry;
            entriesContainer.appendChild(entryElement);
        });
    }
}

// Call displayEntries when the page loads
document.addEventListener("DOMContentLoaded", displayEntries);
