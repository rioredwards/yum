/* Imports */
const fs = require("fs");
const filePathVars = "./colors/yum-vars-color-theme.json";
const filePathColors = "./colors/theme-color.json";
const filePathHex = "./themes/yum-color-theme.json";

/* State Variables */
const mode = process.argv[2];
let fsWait = false;
let colors = null;

function main() {
    updateColors();
    if (!mode || mode === "sync") {
        varsToHex();
        hexToVars();
    } else if (mode === "vars") {
        varsToHex();
    } else if (mode === "vars:watch") {
        watch(filePathVars, varsToHex);
    } else if (mode === "colors:watch") {
        watch(filePathColors, varsToHex);
    } else if (mode === "hex") {
        hexToVars();
    } else if (mode === "hex:watch") {
        watch(filePathHex, hexToVars);
    } else {
        console.log("Invalid mode: " + mode);
    }
}

function watch(readFile, callback) {
    console.log(`Watching for file changes on ${readFile} 👀`);
    fs.watch(readFile, (event, filename) => {
        if (filename && event === "change") {
            if (fsWait) return;
            fsWait = setTimeout(() => {
                fsWait = false;
            }, 100);
            console.log(`${filename} file Changed`);
            if (readFile === filePathColors) {
                updateColors();
            }
            callback();
        }
    });
}

// Read from theme-color.json and create colors obj
function updateColors() {
    const colorsFile = fs.readFileSync(filePathColors, "utf8");
    colors = JSON.parse(colorsFile);
}

// Replaces variables with hexValues
function varsToHex() {
    // Read from yum-color-theme-vars.json
    let varsFile = fs.readFileSync(filePathVars, "utf8");

    // create new string with variables replaced with hex values
    for (const color in colors) {
        let regex = new RegExp(color, "g");
        const newVarsFile = varsFile.replace(regex, colors[color]);
        varsFile = newVarsFile;

        console.log(
            `In ${filePathHex}: replaced: ${color} with: ${colors[color]}`
        );
    }

    // rewrite yum-color-theme.json with new string
    fs.writeFileSync(filePathHex, varsFile, "utf8");
}

// Replaces hexValues with variables
function hexToVars() {
    // Read from yum-color-theme.json
    let hexFile = fs.readFileSync(filePathHex, "utf8");

    // create new string with hex values replaced with variables
    for (const color in colors) {
        let regex = new RegExp(colors[color], "g");
        const newHexFile = hexFile.replace(regex, color);
        hexFile = newHexFile;

        console.log(
            `In ${filePathVars}: replaced: ${colors[color]} with: ${colors}`
        );
    }

    // rewrite yum-color-theme-vars.json with new string
    fs.writeFileSync(filePathVars, hexFile, "utf8");
}

main();
