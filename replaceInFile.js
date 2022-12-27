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
    let replaceStrArray = [];
    // let updatedFile;

    // get colors contents
    colors = getColors(colorsFilePath);
    // format into replaceStrArray based on mode
    replaceStrArray = createReplaceStrArray(colors, mode);

    // Set Read/Write file path based on mode
    if (mode === "vars") {
        readFilePath = varsFilePath;
        writeFilePath = hexFilePath;
        logger("files", { readFilePath, writeFilePath });
        syncFiles(readFilePath, writeFilePath, replaceStrArray);
    } else if (mode === "hex") {
        readFilePath = hexFilePath;
        writeFilePath = varsFilePath;
        logger("files", { readFilePath, writeFilePath });
        syncFiles(readFilePath, writeFilePath, replaceStrArray);
    } else if (mode === "colors") {
        readFilePath = varsFilePath;
        writeFilePath = hexFilePath;
        logger("files", { readFilePath, writeFilePath });
        syncFiles(readFilePath, writeFilePath, replaceStrArray);
    }
}

function syncFiles(readFilePath, writeFilePath, replaceStrArray) {
    // get readFile contents
    let readFileStr = getFileContents(readFilePath);
    // Update readFileStr
    for (const row of replaceStrArray) {
        const newReadFileStr = replaceStrInFile(readFileStr, row.prev, row.new);
        readFileStr = newReadFileStr;
    }
    // rewrite writeFile with new string
    fs.writeFileSync(writeFilePath, readFileStr, "utf8");
}

function replaceStrInFile(file, prevStr, newStr) {
    logger("replacing", { prevStr, newStr });
    let regex = new RegExp(prevStr, "g");
    return file.replace(regex, newStr);
}

function getFileContents(filePath) {
    return fs.readFileSync(filePath, "utf8");
}

function getColors(colorsFilePath) {
    return JSON.parse(getFileContents(colorsFilePath));
}

function createReplaceStrArray(Array, mode) {
    let newArray = [];
    for (const [key, value] of Object.entries(Array)) {
        if (mode === "vars") {
            newArray.push({ prev: key, new: value });
        } else {
            newArray.push({ prev: value, new: key });
        }
    }
    return newArray;
}

/* function watchFiles(files, callback) {
    let fsWait = false;
    console.log(`Watching for file changes on ${files} 👀`);
    for (const file of files) {
        fs.watch(file, (event, filename) => {
            if (filename && event === "change") {
                if (fsWait) return;
                fsWait = setTimeout(() => {
                    fsWait = false;
                }, 100);
                console.log(`${filename} file Changed`);
                if (file === colorsFilePath) {
                    colors = getColors(colorsFilePath);
                }
                callback();
            }
        });
    }
} */

function logger(prompt, data) {
    if (prompt === "files") {
        console.log("Readfile: ", data.readFilePath);
        console.log("Writefile: ", data.writeFilePath);
    } else if (prompt === "replacing") {
        console.log(`Replacing: ${data.prevStr} with ${data.newStr}`);
    }
}

main();
