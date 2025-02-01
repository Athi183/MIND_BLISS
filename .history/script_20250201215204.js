function redirectToLogin() {
    window.location.href = "login.html";
}

function redirectToHome() {
    window.location.href = "home.html";
}

// Function to handle signup
function signupUser() {
    let username = document.getElementById("signup-username").value.trim();
    let password = document.getElementById("signup-password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Check if user already exists
    if (localStorage.getItem(username)) {
        alert("User already exists! Try logging in.");
    } else {
        // Store user credentials and auto-login
        localStorage.setItem(username, password);
        localStorage.setItem("loggedInUser", username);
        alert("Signup successful! Redirecting to home...");
        window.location.href = "home.html";  // Redirect to homepage
    }
}

// Function to check if the user is logged in
function checkLoginStatus() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        console.log("User is logged in as:", loggedInUser);
    }
}

// Call checkLoginStatus on page load
document.addEventListener("DOMContentLoaded", checkLoginStatus);
