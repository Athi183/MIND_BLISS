
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
        window.location.href = "mainhome.html"; // Redirect to mainhome.html
    } else {
        alert("Invalid username or password. Please try again.");
    }}
// Signup functionality
function signupUser() {
    let username = document.getElementById("signup-username").value.trim();
    let password = document.getElementById("signup-password").value.trim();

    if (username && password) {
        // Store the new user's credentials in localStorage
        localStorage.setItem(username, password);

        alert("Sign up successful! Redirecting to home...");
        window.location.href = "mainhome.html"; // Redirect to mainhome.html
    } else {
        alert("Please fill out both fields.");
    }
}


// Check if the user is logged in on page load and display their entries
document.addEventListener("DOMContentLoaded", () => {
    displayEntries();
});

// Large variety of quotes
const quotes = [
    "Happiness depends upon ourselves. – Aristotle",
    "The purpose of our lives is to be happy. – Dalai Lama",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Be happy with what you have while working for what you want. – Helen Keller",
    "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
    "A calm mind brings inner strength and self-confidence. – Dalai Lama",
    "Happiness is not something ready-made. It comes from your own actions. – Dalai Lama",
    "Do more things that make you forget to check your phone.",
    "Every day may not be good, but there is something good in every day.",
    "Be patient. Good things take time.",
    "Happiness looks good on you.",
    "Focus on the step in front of you, not the whole staircase.",
    "Sometimes the smallest step in the right direction ends up being the biggest step of your life.",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "Happiness is a journey, not a destination.",
    "Believe you can and you’re halfway there. – Theodore Roosevelt",
    "The best way to predict the future is to create it. – Peter Drucker",
    "You are enough just as you are.",
    "Difficulties in life are intended to make us better, not bitter."
];

// Function to generate a new quote automatically
function newQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").innerText = quotes[randomIndex];
}

// Automatically generate a quote on page load
document.addEventListener("DOMContentLoaded", newQuote);


// Save gratitude journal entry with title, content, and timestamp
function saveEntry() {
    const title = document.getElementById("entry-title").value.trim();
    const content = document.getElementById("journal").value.trim();
    const date = new Date().toISOString().split('T')[0]; 
    const time = new Date().toLocaleTimeString(); 

    if (!title || !content) {
        alert("Please enter both a title and content for your entry.");
        return;
    }
    // Retrieve existing entries from localStorage or initialize an empty array
    let userEntries = JSON.parse(localStorage.getItem("entries")) || [];

    // Create an entry object
    const entry = { title, content, date, time };

    // Add the new entry
    userEntries.push(entry);

    // Save updated entries back to localStorage
    localStorage.setItem("entries", JSON.stringify(userEntries));

    // Clear input fields
    document.getElementById("entry-title").value = "";
    document.getElementById("journal").value = "";

    // Refresh displayed entries
    displayEntries();
}

// Display journal entries for the selected date
function displayEntries() {
    let entriesContainer = document.getElementById("entries-list");

    if (entriesContainer) {
        entriesContainer.innerHTML = ""; // Clear previous entries

        // Get selected date from calendar or use today's date by default
        let selectedDate = document.getElementById("calendar").value || new Date().toISOString().split('T')[0];

        // Fetch saved entries from localStorage
        let userEntries = JSON.parse(localStorage.getItem("entries")) || [];

        // Filter entries based on selected date
        let filteredEntries = userEntries.filter(entry => entry.date === selectedDate);

        // Display filtered entries
        if (filteredEntries.length === 0) {
            entriesContainer.innerHTML = "<p>No entries for this date yet. Start writing your gratitude now!</p>";
        } else {
            filteredEntries.forEach((entry, index) => {
                let entryDiv = document.createElement("div");
                entryDiv.classList.add("entry");

                // Create a clickable title
                let titleElement = document.createElement("h3");
                titleElement.textContent = `${entry.title} (${entry.time})`;

                // Create a delete button
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = function () {
                    deleteEntry(index);
                };

                // Open paper-style page when title is clicked
                titleElement.onclick = function () {
                    openPaper(entry.title, entry.content); // Open paper-style page and pass entry content
                };

                entryDiv.appendChild(titleElement);
                entryDiv.appendChild(deleteButton);
                entriesContainer.appendChild(entryDiv);
            });
        }
    }
}
// Go back to the main page
function goBack() {
    window.location.href = "mainhome.html"; // Change this to the correct main page URL if needed
}
document.addEventListener("DOMContentLoaded", () => {
    displayEntries();
    
    let backButton = document.getElementById("back");
    if (backButton) {
        backButton.addEventListener("click", goBack);
    }
});
// Function to open the 'paper-style' page and display the entry content
function openPaper(title, content) {
    const paperContainer = document.createElement("div");
    paperContainer.classList.add("paper-container");

    const paperContent = document.createElement("div");
    paperContent.classList.add("paper-content");

    const paperTitle = document.createElement("h2");
    paperTitle.textContent = title;

    const paperText = document.createElement("p");
    paperText.textContent = content;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.classList.add("close-btn");
    closeButton.onclick = function () {
        paperContainer.remove(); // Close the paper and remove it from DOM
    };

    paperContent.appendChild(paperTitle);
    paperContent.appendChild(paperText);
    paperContent.appendChild(closeButton);
    paperContainer.appendChild(paperContent);

    document.body.appendChild(paperContainer); // Append the paper to the body
}

// Delete a specific journal entry
function deleteEntry(index) {
    let userEntries = JSON.parse(localStorage.getItem("entries")) || [];
    userEntries.splice(index, 1); // Remove the entry at the given index

    // Save updated entries back to localStorage
    localStorage.setItem("entries", JSON.stringify(userEntries));

    // Refresh displayed entries
    displayEntries();
}
const slider = document.getElementById("moodSlider");
const emoji = document.getElementById("emoji");
const suggestion = document.getElementById("suggestion");

slider.addEventListener("input", function() {
    let value = parseInt(slider.value);

    if (value < 20) {
        emoji.textContent = "😢"; // Sad
        suggestion.textContent = "Take deep breaths"; 
    } else if (value < 40) {
        emoji.textContent = "😐"; // Neutral
        suggestion.textContent = "Listen to calming music"; 
    } else if (value < 60) {
        emoji.textContent = "🙂"; // Slightly happy
        suggestion.textContent = "Take a short break"; 
    } else if (value < 80) {
        emoji.textContent = "😁"; // Happy
        suggestion.textContent = "Drink some water"; 
    } else {
        emoji.textContent = "🤩"; // Excited
        suggestion.textContent = "Go for a short walk"; 
    }
});


// Filter entries based on selected date
function filterEntriesByDate() {
    displayEntries();
}

// Display entries when the page loads
window.onload = function() {
    displayEntries();
};

// Event listener for filtering entries by date
document.getElementById("calendar").addEventListener("change", filterEntriesByDate);
