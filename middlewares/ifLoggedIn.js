import * as Session from '../services/sessions.js';

export default function ifLoggedIn(req, res, next) {
    // Check if the user is logged in.
    const sessionId = req.cookies?.sId;

    if (sessionId && Session.get(sessionId)) {
        return res.redirect('/users/dashboard');
    }

    next();
}
