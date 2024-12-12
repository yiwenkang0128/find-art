import { v4 as uuid } from 'uuid';
import { userList } from './users.js';
export const sessions = {};

export function addSession(user) {
    const sid = uuid();
    sessions[sid] = user;
    return sid;
}

export function getSessionUser(sid) {
    return sessions[sid]?.username;
}
export function getSessionRole(sid) {
    return sessions[sid]?.role;
}

export function deleteSession(sid) {
    delete sessions[sid];
}

addSession(userList["admin"]);