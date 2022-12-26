const fs = require("fs");
const colors = require("./colors/colors.js");
const filePathVars = "./colors/yum-color-theme-vars.json";
const filePathHex = "./themes/yum-color-theme.json";

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

            console.log(`replaced: ${color} with: ${colors[color]}`);
        }

        // rewrite yum-color-theme.json with new string
        fs.writeFile(filePathHex, varsFile, "utf8", function (err) {
            if (err) return console.log(err);
        });
    });
}

varsToHex();
/* 
function colorsToVars() {
    fs.readFile(colorThemeFilePath, "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var replaceReg = "regex\\d";
        var re = new RegExp(replaceReg, "g");
        const result = data.replace(/colors.bg1/g, colors.bg1);

        fs.writeFile(colorThemeFilePath, result, "utf8", function (err) {
            if (err) return console.log(err);
        });
    });
}
 */
