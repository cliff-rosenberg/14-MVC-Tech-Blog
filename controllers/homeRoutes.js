//*
//* These are the 'base' Express routes
//* all of these load witn only the '/' URL
//*

// set up Express router
const router = require('express').Router();

// load the required models
const { Post, User, Comment } = require("../models");

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
        // By default Sequelize returns lots of metadata
        // To turn medatada off, we use the plain: true option
        const posts = postData.map((post) => post.get({ plain: true }));
        // render the Handlebars template for 'homepage' here
        res.render('homepage', {
            posts,
            username: req.session.username,
            logged_in: req.session.loggedIn
        });
    } catch (err) {
        // returns a '500 Internal Server Error' response
        res.status(500).json(err);
    };
});

//* Express route for adding a Comment to a post
router.get("/post/:id", async (req, res) => {
    console.log("\n", "\x1b[33m", "Route for adding comments rendered in homeRoutes", "\x1b[0m", "\n");
    try {
        // find a post by ID if the link is clicked on when on "homepage"
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "post_content", "title", "created_at"],
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
        })
        // if no data is found, return 404 and message
        if (!postData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }
        // By default Sequelize returns lots of metadata
        // To turn medatada off, we use the plain: true option
        const post = postData.get({ plain: true });
        // render the Handlebars view here
        res.render("post-with-comments", {
            post,
            logged_in: req.session.loggedIn,
            username: req.session.username
        });
    } catch(err) {
        console.log(err);
        // returns a '500 Internal Server Error' response
        res.status(500).json(err);
    };
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
    // Otherwise, render the 'user signup' Handlebars template
    res.render('signup', {
        username: req.session.username,
    });
});

module.exports = router;
