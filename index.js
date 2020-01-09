import axios from 'axios'; 

// const url = "http://localhost:5000/theme-switch/us-central1/api";
const url = "https://us-central1-theme-switch.cloudfunctions.net/api";

function initialize() {
    let style = document.createElement("style");
    style.id = "theme-switch-style";
    document.head.appendChild(style);

    const loadedPaletteId = localStorage.getItem('theme-switch-loaded-palette-id');

    if (loadedPaletteId) {
        loadPalette(loadedPaletteId);
    }
}

function uninitialize() {
    const style = document.getElementById("theme-switch-style");
    style.innerHTML = '';
    localStorage.setItem('theme-switch-loaded-palette-id', '');
}

async function loadPalette(paletteId) {
    const data = await axios.get(`${url}/palette?paletteId=${paletteId}`);
    const palette = data.data;

    if (!palette["palette"]) {
        console.log("Palette not found");
        return;
    }

    const style = document.getElementById("theme-switch-style");

    style.innerHTML = '';

    palette["palette"].forEach(k => {
        style.innerHTML += `
                .${k['name']} {
                    ${k['type']}: ${k['hex']}
                }
            `;
    });

    localStorage.setItem('theme-switch-loaded-palette-id', paletteId);
}

export { initialize, loadPalette, uninitialize };