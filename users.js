export function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}
export const userList = {
    "admin": {
        username: "yiwen",
        role: "admin",
        liked: [],
    },
    "Yiwen": {
        username: "yiwen",
        role: "user",
        liked: ['0011'],
    },
    "Draco": {
        username: "Draco",
        role: "user",
        liked: [],
    },
}
export function isUsernameExists(name) {
    return Object.values(userList).some(user => user.username === name);
}