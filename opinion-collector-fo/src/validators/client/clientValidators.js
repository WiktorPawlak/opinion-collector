
export function validatePassword(password, repeatedPassword) {
    if ((password === "" || repeatedPassword === "") || (password !== repeatedPassword)) {
        return false;
    } else {
        return true;
    }
}

export function validateEmail(email) {
    if ((email === "")) {
        return false;
    } else {
        return true;
    }
}

export function validateUsername(uesrname) {
    if ((uesrname === "")) {
        return false;
    } else {
        return true;
    }
}