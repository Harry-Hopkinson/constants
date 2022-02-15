"use strict";
// scan through a codebase and find all the variables name let or var
// if their value is never changed throughout the file
// then override the let or var to a consant
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const ps = require("prompt-sync");
const inputPrompt = ps();
function printFile(fileName, folderName) {
    let contents = fs.readFileSync(`${folderName}/${fileName}`, "utf8");
    console.log(contents);
}
function findLetAndVars(fileName, folderName) {
    let contents = fs.readFileSync(`${folderName}/${fileName}`, "utf8");
    let lines = contents.split("\n");
    let letAndVars = [];
    for (let line of lines) {
        let lineSplit = line.split(" ");
        for (let word of lineSplit) {
            if (word.includes("let") || word.includes("var")) {
                letAndVars.push(word);
            }
        }
    }
    return letAndVars;
}
function replaceLetAndVars(fileName, folderName) {
    let contents = fs.readFileSync(`${folderName}/${fileName}`, "utf8");
    let lines = contents.split("\n");
    let letAndVars = findLetAndVars(fileName, folderName);
    let newContents = "";
    for (let line of lines) {
        let lineSplit = line.split(" ");
        for (let word of lineSplit) {
            if (letAndVars.includes(word)) {
                // remove the let or var
                let newWord = word.replace("let", "").replace("var", "");
                // replace the word with a const
                newWord = `const ${newWord}`;
                // replace the word in the line
                line = line.replace(word, newWord);
            }
            else {
                newContents += word + " ";
            }
        }
        newContents += "\n";
    }
    fs.writeFileSync(`${folderName}/${fileName}`, newContents);
}
function writeToFile(fileName, folderName, contents) {
    fs.writeFileSync(`${folderName}/${fileName}`, contents);
}
function main() {
    let folderName = inputPrompt("Enter folder name: ");
    let fileName = inputPrompt("Enter file name: ");
    printFile(fileName, folderName);
    replaceLetAndVars(fileName, folderName);
}
main();
