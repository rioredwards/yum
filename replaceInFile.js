/* Imports */
const fs = require("fs");
const colors = require("./colors/colors.js");
const filePathVars = "./colors/yum-color-theme-vars.json";
const filePathHex = "./themes/yum-color-theme.json";

/* State Variables */
const mode = process.argv[2];
let fsWait = false;

function watch(readFile, callback) {
    console.log(`Watching for file changes on ${readFile} 👀`);
    fs.watch(readFile, (event, filename) => {
        if (filename && event === "change") {
            if (fsWait) return;
            fsWait = setTimeout(() => {
                fsWait = false;
            }, 100);
            console.log(`${filename} file Changed`);
            callback();
        }
    });
}

function main() {
    if (!mode || mode === "sync") {
        varsToHex();
        hexToVars();
    } else if (mode === "vars") {
        varsToHex();
    } else if (mode === "vars:watch") {
        watch(filePathVars, varsToHex);
    } else if (mode === "hex") {
        hexToVars();
    } else if (mode === "hex:watch") {
        watch(filePathHex, hexToVars);
    } else {
        console.log("Invalid mode: " + mode);
    }
}

// Replaces variables with hexValues
function varsToHex() {
    // Read from yum-color-theme-vars.json
    fs.readFile(filePathVars, "utf8", function (err, data) {
        let varsFile;
        if (err) {
            return console.log(err);
        } else {
            varsFile = data;
        }

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
        fs.writeFile(filePathHex, varsFile, "utf8", function (err) {
            if (err) return console.log(err);
        });
    });
}

// Replaces hexValues with variables
function hexToVars() {
    // Read from yum-color-theme.json
    fs.readFile(filePathHex, "utf8", function (err, data) {
        let hexFile;
        if (err) {
            return console.log(err);
        } else {
            hexFile = data;
        }

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
        fs.writeFile(filePathVars, hexFile, "utf8", function (err) {
            if (err) return console.log(err);
        });
    });
}

main();
