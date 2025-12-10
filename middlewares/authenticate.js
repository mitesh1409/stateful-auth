import * as Session from '../services/sessions.js';

export default function authenticate(req, res, next) {
    const sessionId = req.cookies?.sId;
    req.authUser = sessionId ? Session.get(sessionId) : null;
    next();
}
