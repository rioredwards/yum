/* Imports */
const fs = require("fs");
const varsFilePath = "./colors/yum-vars-color-theme.json";
const colorsFilePath = "./colors/theme-color.json";
const hexFilePath = "./themes/yum-color-theme.json";

/* Declare State Variables */
const mode = process.argv[2];
let readFilePath;
let writeFilePath;
let colors;
let newAndOldStrings = [];
let fsWait = false;

function main() {
  // get colors contents
  colors = getColors(colorsFilePath);
  // format into newAndOldStrings based on mode
  newAndOldStrings = createNewAndOldStrings(colors, mode);

  // Set Read/Write file path based on mode
  if (mode === "vars") {
    // Choosing files to sync
    readFilePath = varsFilePath;
    writeFilePath = hexFilePath;
    // Logging
    logger("files", { readFilePath, writeFilePath });
    // Syncing Files
    syncFiles(readFilePath, writeFilePath, newAndOldStrings);
  } else if (mode === "hex") {
    readFilePath = hexFilePath;
    writeFilePath = varsFilePath;
    logger("files", { readFilePath, writeFilePath });
    syncFiles(readFilePath, writeFilePath, newAndOldStrings);
  } else if (mode === "colors") {
    readFilePath = varsFilePath;
    writeFilePath = hexFilePath;
    logger("files", { readFilePath, writeFilePath });
    syncFiles(readFilePath, writeFilePath, newAndOldStrings);
  } else if (mode === "watch") {
    readFilePath = varsFilePath;
    writeFilePath = hexFilePath;
    watchFile(varsFilePath, syncFiles);
    watchFile(colorsFilePath, syncFiles);
  } else {
    console.log("Incorrect input for mode");
  }
}

function watchFile(file, callback) {
  console.log(`Watching for file changes on ${file} 👀`);
  fs.watch(file, (event, filename) => {
    if (filename && event === "change") {
      if (fsWait) return;
      fsWait = setTimeout(() => {
        fsWait = false;
      }, 100);
      console.log(`${filename} file Changed`);
      if (file === colorsFilePath) {
        colors = getColors(colorsFilePath);
        if (colors) newAndOldStrings = createNewAndOldStrings(colors, mode);
      }
      callback(readFilePath, writeFilePath, newAndOldStrings);
    }
  });
}

function syncFiles(readFilePath, writeFilePath, newAndOldStrings) {
  // get readFile contents
  let readFileStr = getFileContents(readFilePath);
  // Update readFileStr
  for (const row of newAndOldStrings) {
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
  const colorsRaw = getFileContents(colorsFilePath);
  let colorsObj = null;
  try {
    colorsObj = JSON.parse(colorsRaw);
  } catch (error) {
    console.warn(error);
  } finally {
    return colorsObj;
  }
}

function createNewAndOldStrings(Array, mode) {
  let newArray = [];
  for (const [key, value] of Object.entries(Array)) {
    if (mode === "hex") {
      newArray.push({ prev: value, new: key });
    } else {
      newArray.push({ prev: key, new: value });
    }
  }
  return newArray;
}

function logger(prompt, data) {
  if (prompt === "files") {
    console.log("Readfile: ", data.readFilePath);
    console.log("Writefile: ", data.writeFilePath);
  } else if (prompt === "replacing") {
    console.log(`Replacing: ${data.prevStr} with ${data.newStr}`);
  }
}

main();
