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


//* find all Comments
router.get('/', async (req, res) => {
    console.log("\n", "\x1b[33m", "Route to find all Comments rendered in commentRoutes", "\x1b[0m", "\n");
    try {
        const commentData = await Comment.findAll({})
        res.json(commentData)
    } catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
});

//* find all comments by ID
router.get('/:id', async (req, res) => {
    console.log("\n", "\x1b[33m", "Route to find Comments by ID rendered in commentRoutes", "\x1b[0m", "\n");
    try {
        const commentData = await Comment.findAll({
            where: {
                id: req.params.id
            }
        });
    res.json(commentData);
    } catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
});

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

//* update a single comment by ID
router.put('/:id', withAuth, async (req, res) => {
    console.log("\n", "\x1b[33m", "Route to update a Comment rendered", "\x1b[0m", "\n");
    try {
        const commentData = await Comment.update({
            comment_body: req.body.comment_body
        }, {
            where: {
                id: req.params.id
            }
        })
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(commentData);
    } catch(err) {
        console.log(err);
        // returns a Server error response
        res.status(500).json(err);
    };
});

//* delete a comment
//* only allowed for logged in users
router.delete('/:id', withAuth, async (req, res) => {
    console.log("\n", "\x1b[33m", "Route to delete one Comment rendered in commentRoutes", "\x1b[0m", "\n");
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(commentData);
    } catch(err) {
        console.log(err);
        // returns a Server error response
        res.status(500).json(err);
    };
});

module.exports = router;
