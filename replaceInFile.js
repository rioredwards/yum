/* Imports */
const fs = require("fs");
const varsFilePath = "./colors/yum-vars-color-theme.json";
const colorsFilePath = "./colors/theme-color.json";
const hexFilePath = "./themes/yum-color-theme.json";

function main() {
    /* Declare State Variables */
    const mode = process.argv[2];
    let readFilePath;
    let writeFilePath;
    let colors;
    let fsWait = false;

    // Set Read/Write file path based on mode
    if (mode === "vars") {
        readFilePath = varsFilePath;
        writeFilePath = hexFilePath;
    } else if (mode === "hex") {
        readFilePath = hexFilePath;
        writeFilePath = varsFilePath;
    } else if (mode == "colors") {
        // ???
    } else {
        // ???
    }

    // get colors & readFile contents
    colors = JSON.parse(getFileContents(colorsFilePath));
    let readFileStr = getFileContents(readFilePath);

    for (const color in colors) {
        // Set prevStr & newStr based on mode
        let prevStr = mode === "vars" ? color : colors[color];
        let newStr = mode === "vars" ? colors[color] : color;
        // Create new modified str
        readFileStr = replaceStrInFile(updatedFile, prevStr, newStr);
    }

    // rewrite writeFile with new string
    fs.writeFileSync(writeFilePath, readFileStr, "utf8");

    // if (mode === "vars:watch") {
    //     watch(varsFilePath, varsToHex);
    // } else if (mode === "colors:watch") {
    //     watch(colorsFilePath, varsToHex);
    // } else if (mode === "hex") {
    //     hexToVars();
    // } else if (mode === "hex:watch") {
    //     watch(hexFilePath, hexToVars);
    // } else {
    //     console.log("Invalid mode: " + mode);
    // }
}

function replaceStrInFile(file, prevStr, newStr) {
    let regex = new RegExp(prevStr, "g");
    return file.replace(regex, newStr);
}

console.log(`In ${readFilePath}: replaced: ${prevStr} with: ${newStr}`);

function watch(readFile, callback) {
    console.log(`Watching for file changes on ${readFile} 👀`);
    fs.watch(readFile, (event, filename) => {
        if (filename && event === "change") {
            if (fsWait) return;
            fsWait = setTimeout(() => {
                fsWait = false;
            }, 100);
            console.log(`${filename} file Changed`);
            if (readFile === colorsFilePath) {
                updateColors();
            }
            callback();
        }
    });
}

function getFileContents(filePath) {
    return fs.readFileSync(filePath, "utf8");
}

// Replaces variables with hexValues
function varsToHex() {
    // Read from yum-color-theme-vars.json
    let varsFile = fs.readFileSync(varsFilePath, "utf8");

    // create new string with variables replaced with hex values
    for (const color in colors) {
        let regex = new RegExp(color, "g");
        const newVarsFile = varsFile.replace(regex, colors[color]);
        varsFile = newVarsFile;

        console.log(
            `In ${hexFilePath}: replaced: ${color} with: ${colors[color]}`
        );
    }

    // rewrite yum-color-theme.json with new string
    fs.writeFileSync(hexFilePath, varsFile, "utf8");
}

// Replaces hexValues with variables
function hexToVars() {
    // Read from yum-color-theme.json
    let hexFile = fs.readFileSync(hexFilePath, "utf8");

    // create new string with hex values replaced with variables
    for (const color in colors) {
        let regex = new RegExp(colors[color], "g");
        const newHexFile = hexFile.replace(regex, color);
        hexFile = newHexFile;

        console.log(
            `In ${varsFilePath}: replaced: ${colors[color]} with: ${colors}`
        );
    }

    // rewrite yum-color-theme-vars.json with new string
    fs.writeFileSync(varsFilePath, hexFile, "utf8");
}

main();
