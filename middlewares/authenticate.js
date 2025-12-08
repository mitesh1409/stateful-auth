import * as Session from '../services/sessions.js';

export default function authenticate(req, res, next) {
    const sessionId = req.cookies?.sId;

    if (!sessionId) {
        return res.redirect('/users/sign-in');
    }

    const user = Session.get(sessionId);

    if (!user) {
        return res.redirect('/users/sign-in');
    }

    req.user = user;

    next();
}
