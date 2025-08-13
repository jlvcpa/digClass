console.log("✅ init.js is running");

function loadStyle(path) {
  const link = document.getElementById("styleLink");
  link.href = path;
}

function showLogin() {
  loadStyle("styles/login.css");
  document.getElementById("loginForm").style.display = "block";
}

function showDashboard() {
  loadStyle("styles/dashboard.css");
  document.getElementById("dashboardContainer").style.display = "flex";
}

window.login = function () {
  // Simulate login success
  document.getElementById("loginForm").style.display = "none";
  showDashboard();
};

document.addEventListener("DOMContentLoaded", () => {
  showLogin(); // Start with login screen
});