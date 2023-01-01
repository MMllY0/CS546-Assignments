function checkValid(input){
    if (!input) throw`error: input not valid`;
}

function checkString(input){
    if (typeof input !== 'string') throw `error: input ${input} is not a string`;
    if (input.trim().length == 0) throw `error: input ${input} is empty`;
    input = input.trim();
    return input;
}

function checkName(input){
    if (input.length < 3) throw `error: input length is less than 3`;
    const pattern = /\p{S}|\p{N}|\p{P}/gu;
    if (input.match(pattern) !== null) throw `error: ${input} contains one or more invalid character.`;
    input = input.toLowerCase();
    return input;
}

function checkId(id) {
    if (!Number.isInteger(Number(id))) throw `error: ${id} is not an integer.`;
    if (Number(id) < 0) throw`error: id is negative`
    id = Number(id);
    return id;
}


module.exports = {
    checkValid,
    checkString,
    checkName,
    checkId
}
