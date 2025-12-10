import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import User from "../models/user.model.js";
import * as Session from "../services/sessions.js";

function signUp(req, res) {
    if (req.authUser) {
        return res.redirect('/users/dashboard');
    }

    res.render('users/sign-up', {
        metaTitle: 'Stateful Authentication Example | Sign Up'
    });
}

async function doSignUp(req, res) {
    if (req.authUser) {
        return res.redirect('/users/dashboard');
    }

    const {
        firstName,
        lastName,
        gender,
        dob,
        email,
        password
    } = req.body;

    if (!firstName || !lastName || !gender || !dob || !email || !password) {
        return res
            .status(400)
            .render('users/sign-up', {
                metaTitle: 'Stateful Authentication Example | Sign Up',
                status: 'failure',
                error: 'All fields are required.'
            });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            firstName,
            lastName,
            gender,
            dob,
            email,
            password: hashedPassword,
        });
    } catch (error) {
        console.error('Error during user sign-up:', error);

        return res
            .status(500)
            .render('users/sign-up', {
                metaTitle: 'Stateful Authentication Example | Sign Up',
                status: 'failure',
                error: 'Something went wrong. Please try again.'
            });
    }

    return res
        .status(201)
        .render('users/sign-up', {
            metaTitle: 'Stateful Authentication Example | Sign Up',
            status: 'success',
            message: 'User sign-up successful.'
        });
}

function signIn(req, res) {
    if (req.authUser) {
        return res.redirect('/users/dashboard');
    }

    res.render('users/sign-in', {
        metaTitle: 'Stateful Authentication Example | Sign In'
    });
}

async function doSignIn(req, res) {
    if (req.authUser) {
        return res.redirect('/users/dashboard');
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .render('users/sign-in', {
                metaTitle: 'Stateful Authentication Example | Sign In',
                error: 'Email and Password are required'
            });
    }

    const user = await User.findOne({ email: email }).exec();

    if (!user) {
        return res
            .status(401)
            .render('users/sign-in', {
                metaTitle: 'Stateful Authentication Example | Sign In',
                error: 'Failed to login. Email or Password incorrect.'
            });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res
            .status(401)
            .render('users/sign-in', {
                metaTitle: 'Stateful Authentication Example | Sign In',
                error: 'Failed to login. Email or Password incorrect.'
            });
    }

    // Generate a session uid.
    const sessionId = uuidv4();

    // Set user session.
    // Here we are saving user data/state into a session on the server-side.
    // That is why this is Stateful Authentication.
    Session.set(sessionId, {
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        dob: user.dob,
        email: user.email,
    });

    // Set cookie with sessionId.
    // Here we only send the session id to the client via cookie.
    // So in the subsequent requests, client will send this back to the server via cookie.
    // This process is implicit from client's end.
    res.cookie('sId', sessionId);

    return res.redirect('/users/dashboard');
}

function dashboard(req, res) {
    if (!req.authUser) {
        return res.redirect('/users/sign-in');
    }

    const authUser = req.authUser;
    res.render('users/dashboard', {
        metaTitle: 'Stateful Authentication Example | Dashboard',
        userFullName: `${authUser.firstName} ${authUser.lastName}`
    });
}

function signOut(req, res) {
    if (!req.authUser) {
        return res.redirect('/users/sign-in');
    }

    // Remove session entry for this user from the server side.
    Session.remove(req.cookies.sId);

    // Remove the cookie as well.
    res.clearCookie('sId');

    // Redirect to sign in page.
    return res.redirect('/users/sign-in');
}

export {
    signUp,
    doSignUp,
    signIn,
    doSignIn,
    dashboard,
    signOut
};
