let deferredInstallPrompt = null;
const installButton = document.getElementById("butInstall");

function saveBeforeInstallPromptEvent(evt) {
  deferredInstallPrompt = evt;
  installButton.removeAttribute("hidden");
}

function installPWA(evt) {
  deferredInstallPrompt.prompt();
  evt.srcElement.setAttribute("hidden", true);
  deferredInstallPrompt.userChoice.then((choice) => {
    if (choice.outcome === "accepted") {
      console.log("L'usager a accepte", choice);
    } else {
      console.log("L'usager a refuse", choice);
    }
    deferredInstallPrompt = null;
  });
}

function logAppInstalled(evt) {
  console.log("L'application What'soup a ete installee !", evt);
}

installButton.addEventListener("click", installPWA);

window.addEventListener("beforeinstallprompt", saveBeforeInstallPromptEvent);

window.addEventListener("appinstalled", logAppInstalled);
