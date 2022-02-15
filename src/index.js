"use strict";
function scanForLetOrVar(code) {
    const letOrVarRegex = /(let|var)\s+([a-zA-Z0-9_]+)/g;
    const letOrVarMatches = code.match(letOrVarRegex);
    if (!letOrVarMatches) {
        return [];
    }
    return letOrVarMatches.map((match) => match.split(" ")[1]);
}
