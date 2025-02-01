// Generate a random quote for the home page
function newQuote() {
    const quotes = [
        "Happiness depends upon ourselves. – Aristotle",
        "The purpose of our lives is to be happy. – Dalai Lama",
        "Do what you can, with what you have, where you are. – Theodore Roosevelt",
        "Be happy with what you have while working for what you want. – Helen Keller"
    ];
    document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];
}

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
