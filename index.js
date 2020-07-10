const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyD2bmDDpXR1SKJupQznpavT6yY5efulJTU",
  authDomain: "theme-switch.firebaseapp.com",
  databaseURL: "https://theme-switch.firebaseio.com",
  projectId: "theme-switch",
  storageBucket: "theme-switch.appspot.com",
  messagingSenderId: "531247626942",
  appId: "1:531247626942:web:948bcdbfcb269d4fcb3cef",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
let oldPaletteId = "";

function initialize() {
  let style = document.createElement("style");
  style.id = "theme-switch-style";
  document.head.appendChild(style);

  const loadedPaletteId = localStorage.getItem(
    "theme-switch-loaded-palette-id"
  );

  if (loadedPaletteId) {
    loadPalette(loadedPaletteId);
  }
}

function uninitialize() {
  const style = document.getElementById("theme-switch-style");
  style.innerHTML = "";
  localStorage.setItem("theme-switch-loaded-palette-id", "");
}

async function loadPalette(paletteId) {
  if (oldPaletteId) {
    database.ref(`palettes/${oldPaletteId}`).off();
  }

  oldPaletteId = paletteId;

  database.ref(`palettes/${paletteId}`).on("value", (snapshot) => {
    const palette = snapshot.val();

    if (!palette.palette) {
      console.log("Palette not found");
      return;
    }

    const style = document.getElementById("theme-switch-style");

    style.innerHTML = "";

    palette.palette.forEach((k) => {
      const hover = k["hover"] ? ":hover" : "";

      switch (k["type"]) {
        case "border-color": {
          const borderOptions = k["borderOptions"];

          if (borderOptions) {
            const attrs = "";
            Object.keys(borderOptions).forEach((border) => {
              if (borderOptions[border]) {
                attrs += `${border}: ${k["hex"]};`;
              }
            });

            style.innerHTML += `
              .${k["name"]}${hover} {
                ${attrs}
              }
            `;
          } else {
            style.innerHTML += `
              .${k["name"]}${hover} {
                border-color: none;
              }
            `;
          }

          break;
        }
        case "box-shadow": {
          const shadowOptions = k["boxShadowOptions"];

          if (shadowOptions) {
            style.innerHTML += `
              .${k["name"]}${hover} {
                box-shadow: ${shadowOptions["hL"]}px ${shadowOptions["vL"]}px ${shadowOptions["blur"]}px ${shadowOptions["spread"]}px ${k["hex"]};
              }
            `;
          } else {
            style.innerHTML += `
              .${k["name"]}${hover} {
                box-shadow: 10px 10px 5px 0px ${k["hex"]};
              }
            `;
          }

          break;
        }
        default: {
          style.innerHTML += `
          .${k["name"]}${hover} {
            ${k["type"]}: ${k["hex"]};
          }
        `;
        }
      }
    });

    localStorage.setItem("theme-switch-loaded-palette-id", paletteId);
  });
}

module.exports = {
  initialize,
  uninitialize,
  loadPalette,
};
