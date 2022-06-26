//*
//* These are the 'base' Express routes
//* all of these load witn only the '/' URL
//*

// set up Express router
const router = require('express').Router();
// load 'auth.js' util
const withAuth = require('../utils/auth');

//* this is the base Express route when the "homepage.handlebars" loads
router.get('/', withAuth, async (req, res) => {
    console.log('base route rendered in homeRoutes');
    try {
        res.render('homepage', {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a '500 Internal Server Error' response
        res.status(500).json(err);
    }
});

//* Express route for user Login
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    // will load if 'req.session.loggedIn' evaluates to TRUE
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' Handlebars template
    res.render('login');
});

module.exports = router;
