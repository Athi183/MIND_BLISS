function redirectToLogin() {
    window.location.href = "login.html";
}

function redirectToHome() {
    window.location.href = "home.html";
}

function newQuote() {
    const quotes = [
        "Happiness depends upon ourselves. – Aristotle",
        "The purpose of our lives is to be happy. – Dalai Lama",
        "Do what you can, with what you have, where you are. – Theodore Roosevelt",
        "Be happy with what you have while working for what you want. – Helen Keller"
    ];
    document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];
}

function saveEntry() {
    const entry = document.getElementById("journal").value;
    if (entry.trim()) {
        alert("Gratitude entry saved: " + entry);
        document.getElementById("journal").value = "";
    } else {
        alert("Write something before saving!");
    }
}
