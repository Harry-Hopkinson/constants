// scan through a codebase and find all the variables name let or var
// if their value is never changed throughout the file
// then override the let or var to a consant

import * as fs from "fs";
const ps = require("prompt-sync");
const inputPrompt = ps();

function printFile(fileName: string, folderName: string) {
    let contents = fs.readFileSync(`${folderName}/${fileName}`, "utf8");
    console.log(contents);
}

function findLetAndVars(fileName: string, folderName: string) {
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

function replaceLetAndVars(fileName: string, folderName: string) {
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
            } else {
                newContents += word + " ";
            }
        }
        newContents += "\n";
    }
    fs.writeFileSync(`${folderName}/${fileName}`, newContents);
}

function writeToFile(fileName: string, folderName: string, contents: string) {
    fs.writeFileSync(`${folderName}/${fileName}`, contents);
}

function main() {
    let folderName = inputPrompt("Enter folder name: ");
    let fileName = inputPrompt("Enter file name: ");
    printFile(fileName, folderName);
    replaceLetAndVars(fileName, folderName);
}
main();
