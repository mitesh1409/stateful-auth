const sessions = new Map();

function set(sessionId, userData) {
    sessions.set(sessionId, userData);
}

function get(sessionId) {
    return sessions.get(sessionId);
}

export {
    set, get
};