//*
//* These are the Express routes to load 
//* various routes related to user login security
//* all routes have the '/api/posts' prefix in the URL
//*
// require User model
const { User, Post, Comment } = require('../../models');
// set up Express router
const router = require('express').Router();

const withAuth = require('../../utils/auth');

// get all Posts
router.get('/', async (req, res) => {
    console.log('postRoutes-getAllPosts');
    try {
    const postData = await Post.findAll({
        attributes: ['id',
            'title',
            'post_content',
            'created_at'
        ],
        order: [
            ['created_at', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    });
    res.status(200).json(postData.reverse())
    } catch (err) {
        console.log(err);
        // returns a Server error response
        res.status(500).json(err);
    };
});

//* find a Post by ID
router.get('/find', withAuth, async (req, res) => {
    try {
    const postData = await Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
            'post_content',
            'title',
            'created_at'
        ],

        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }

        }
        ]
    });
    if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
        }
        res.json(postData);
    } catch(err) {
        console.log(err);
            // returns a Server error response
            res.status(500).json(err);
    }
});

//* create a new Post
router.post('/new', withAuth, async (req, res) => {
    console.log('postRoutes-createNewPost')
    console.log(req.body);
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        });
        res.redirect('/api/dashboard')
        // res.status(200).json({message: 'OK'})
        //res.status(200).json(postData);
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
});

//* this will UPDATE and existing post when given an ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            post_content: req.body.post_content
        },
        {
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(postData);
    } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

//* this will DELETE the Post with a matching ID number
router.delete('/:id', withAuth, async (req, res) => {
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
        // return a success message
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        // returns a Server error response
        res.status(500).json(err);
    }
        
});

module.exports = router;
