//*
//* These are the Express routes to load 
//* various routes related to user posts
//* all routes have the '/api/posts' prefix in the URL
//*
// require User model
const { User, Post, Comment } = require('../../models');
// set up Express router
const router = require('express').Router();
// load user auth middleware
const withAuth = require('../../utils/auth');

//* create a new Post
router.post('/new', withAuth, async (req, res) => {
    console.log("\n", "\x1b[33m", "Triggered route to create a new Post in postRoutes", "\x1b[0m", "\n");
    console.log(req.body);
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        });
        // redirect to 'Dashboard' page
        // after new post is created successfully
        res.redirect('/api/dashboard')
        } catch(err) {
            console.log(err);
            // returns a Server error response
            res.status(500).json(err);
        };
});// end route

//* this will UPDATE an existing post when given an ID
router.post('/update/', withAuth, async (req, res) => {
    console.log("\n", "\x1b[33m", "Triggered route to update a Post in postRoutes", "\x1b[0m", "\n");
    try {
        // the POST request from the 'Edit' form returns the fields
        // 'postID', 'title', and 'post_content'
        const postData = await Post.update({
            title: req.body.title,
            post_content: req.body.post_content
        },
        {
            where: {
                id: req.body.postId
            }
        });
        if (!postData) {
            // if no results, return a 404 with message
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // redirect back to the 'dashboard' page
        res.redirect('/api/dashboard');
    } catch(err) {
            console.log(err);
            // returns a Server error response
            res.status(500).json(err);
        }
});// end route

//* this will DELETE the Post with a matching ID number
router.delete('/:id', withAuth, async (req, res) => {
    console.log("\n", "\x1b[33m", "Triggered route to delete a Post in postRoutes", "\x1b[0m", "\n");
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        // if no match, return an error
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // return a success message with data;
        // the helper module will provide a redirect
        //  to the 'Dashboard' page
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        // returns a Server error response
        res.status(500).json(err);
    }
});// end route

module.exports = router;
