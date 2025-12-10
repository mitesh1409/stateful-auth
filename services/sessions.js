const sessions = new Map();

function set(sessionId, userData) {
    sessions.set(sessionId, userData);
}

function get(sessionId) {
    return sessions.get(sessionId);
}

function remove(sessionId) {
    return sessions.delete(sessionId);
}

export {
    set,
    get,
    remove
};
