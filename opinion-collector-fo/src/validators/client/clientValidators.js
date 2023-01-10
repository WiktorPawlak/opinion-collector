
export function validatePassword(password, repeatedPassword) {
    if ((password === "" || repeatedPassword === "") || (password !== repeatedPassword)) {
        return false;
    } else {
        return true;
    }
}