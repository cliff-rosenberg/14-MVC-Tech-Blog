//*
//* These are the Express routes to load 
//* various routes related to user Comments on Posts
//* all routes have the '/api/comment' prefix in the URL
//*
// require user model
const { Comment } = require('../../models');
// set up Express router
const router = require('express').Router();
// load user auth middleware
const withAuth = require('../../utils/auth');

//* post a new comment
//* but only for logged in users
router.post('/', withAuth, async (req, res) => {
    console.log("\n", "\x1b[33m", "Route to post new Comment rendered in commentRoutes", "\x1b[0m", "\n");
    try {
        if (req.session) {
            const commentData =  await Comment.create({
                comment_body: req.body.comment_body,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            });
            res.json(commentData);
        };
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
        };
});


module.exports = router;
