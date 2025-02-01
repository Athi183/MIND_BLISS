// Redirect to login page
function redirectToLogin() {
    window.location.href = "login.html";
}

// Redirect to home page after login
function redirectToHome() {
    // Get user credentials
    let username = document.querySelector("input[type='text']").value.trim();
    let password = document.querySelector("input[type='password']").value.trim();

    // Check if username and password match the stored credentials
    let storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        // Save logged-in user in localStorage
        localStorage.setItem("loggedInUser", username);
        alert("Login successful! Redirecting to home...");
        window.location.href = "home.html"; // Redirect to homepage
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

// Generate a random quote
function newQuote() {
    const quotes = [
        "Happiness depends upon ourselves. – Aristotle",
        "The purpose of our lives is to be happy. – Dalai Lama",
        "Do what you can, with what you have, where you are. – Theodore Roosevelt",
        "Be happy with what you have while working for what you want. – Helen Keller"
    ];
    document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];
}

// Save gratitude journal entry
function saveEntry() {
    let entry = document.getElementById("journal").value.trim();
    if (!entry) {
        alert("Write something before saving!");
        return;
    }

    // Get logged-in user from localStorage
    let username = localStorage.getItem("loggedInUser");

    if (!username) {
        alert("Please log in first!");
        return;
    }

    // Fetch existing journal entries or create an empty array
    let userEntries = JSON.parse(localStorage.getItem(username + "_entries")) || [];
    
    // Save the new journal entry
    userEntries.push(entry);
    localStorage.setItem(username + "_entries", JSON.stringify(userEntries));

    alert("Gratitude entry saved!");
    document.getElementById("journal").value = "";
    displayEntries();  // Update displayed journal entries
}

// Display journal entries for the logged-in user
function displayEntries() {
    let username = localStorage.getItem("loggedInUser");
    if (!username) return;

    // Fetch saved entries from localStorage
    let userEntries = JSON.parse(localStorage.getItem(username + "_entries")) || [];
    let entriesContainer = document.getElementById("entries");

    if (entriesContainer) {
        entriesContainer.innerHTML = ""; // Clear previous entries
        userEntries.forEach(entry => {
            let entryElement = document.createElement("p");
            entryElement.textContent = "• " + entry;
            entriesContainer.appendChild(entryElement);
        });
    }
}

// Check if the user is logged in on page load and display their entries
document.addEventListener("DOMContentLoaded", () => {
    displayEntries();
});
