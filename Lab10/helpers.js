function checkUserName(userName) {
    if (!userName) throw `error: must provide an user name`;
    if (typeof userName != 'string') throw `error: user name must be a string`;
    userName = userName.trim();
    if (userName.length == 0) throw `error: user name cannot be empty`;
    if (userName.length < 4) throw `error: user name should be at least 4 characters long`;
    let pattern = /\p{S}|\p{Z}|\p{P}/gu;
    if (userName.match(pattern)) throw `error: user name contains illegal character(s)`
    username = userName.toLowerCase();
    return userName;
}

function checkPassword(password) {
    if (!password) throw `error: must provide an password`;
    if (typeof password != 'string') throw `error: password must be a string`;
    password = password.trim();
    if (password.length == 0) throw `error: password cannot be empty`;
    if (password.split(' ').length>1) throw `error: password contains spaces`;
    if (password.toLowerCase === password) throw `error: password must have at least one uppercase`;
    if (!password.match(/[0-9]/gu) || !password.match(/[A-Z]/gu) 
        || !(password.match(/\p{S}/gu) || password.match(/\p{P}/gu)))  {
        throw `error: password must contain at least one uppercase, one special character, and one number`;
    };
    if (password.length < 6) throw `error: password should be at least 6 characters long`;
    return password;
};

module.exports = {
    checkPassword,
    checkUserName
}
