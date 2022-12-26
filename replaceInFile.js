const fs = require("fs");
const colors = require("./colors/colors.js");
const filePathVars = "./colors/yum-color-theme-vars.json";
const filePathHex = "./themes/yum-color-theme.json";
const mode = process.argv[2];

async function main() {
    if (!mode || mode === "sync") {
        await varsToHex();
        await hexToVars();
    } else if (mode === "hex") {
        await varsToHex();
    } else if (mode === "vars") {
        await hexToVars();
    } else {
        console.log("Invalid mode: " + mode);
    }
}

// Replaces variables with hexValues
async function varsToHex() {
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
async function hexToVars() {
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
