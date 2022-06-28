//*
//* These are the 'base' Express routes
//* all of these load witn only the '/' URL
//*

// set up Express router
const router = require('express').Router();

// load the required models
const { Post, User, Comment } = require("../models");

// load Sequelize
const sequelize = require("../config/connection");

//* this is the base Express route when the "homepage.handlebars" loads
router.get('/', async (req, res) => {
    console.log("\n", "\x1b[33m", "Route for homepage rendered in homeRoutes", "\x1b[0m", "\n");
    try {
        const postData = await Post.findAll({
            attributes: ["id", "title", "post_content", "created_at"],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_body",
                        "post_id",
                        "user_id",
                        "created_at",
                    ],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(req.session.username);
        res.render('homepage', {
            posts,
            username: req.session.username,
            logged_in: req.session.loggedIn
        });
    } catch (err) {
        // returns a '500 Internal Server Error' response
        res.status(500).json(err);
    }
});

//* Express route for user Login
router.get('/login', (req, res) => {
    console.log("\n", "\x1b[33m", "Route for login rendered in homeRoutes", "\x1b[0m", "\n");
    // If the user is already logged in, redirect to the homepage
    // will load if 'req.session.loggedIn' evaluates to TRUE
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' Handlebars template
    res.render('login', {
        username: req.session.username,
    });
});

//* Express route for user signup
router.get('/signup', (req, res) => {
    console.log("\n", "\x1b[33m", "Route for sign-up rendered in homeRoutes", "\x1b[0m", "\n");
    // If the user is already logged in, redirect to the homepage
    // will load if 'req.session.loggedIn' evaluates to TRUE
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' Handlebars template
    res.render('signup', {
        username: req.session.username,
    });
});

module.exports = router;
