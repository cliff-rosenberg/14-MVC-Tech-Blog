//*
//* These are the Express routes to load 
//* various routes related to user login security
//* all routes have the '/api/dashboard' prefix in the URL
//*
// require User model
const { User, Post, Comment } = require('../../models');
// set up Express router
const router = require('express').Router();

const withAuth = require('../../utils/auth');

//* Express route to get all posts from the logged in user
//* user_id should match the post data
//* this is for the user 'Dashboard'
router.get("/", withAuth, async (req, res) => {
	try {
    const postData = await Post.findAll({
		where: {
			user_id: req.session.user_id,
		},
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
	})
    const posts = postData.map((data) => data.get({ plain: true }));
			res.render("dashboard", {
				posts,
				username: req.session.username,
				logged_in: req.session.loggedIn,
			});
} catch (err) {
    console.log(err);
    // returns a Server error response
    res.status(500).json(err);
}
});

//* this renders the 'New Post' page view
//* allows the logged in user to enter a new post
router.get("/new", withAuth, (req, res) => {
	// render the 'New Post' page
	res.render("new-post", {
		username: req.session.username,
		logged_in: req.session.loggedIn,
	});
});

//* this route allows the logged in User
//* to edit their posts in the 'Dashboard' page
router.get("/edit/:id", withAuth, async (req, res) => {
	try {
		const postData = await Post.findOne({
		where: {
			id: req.params.id,
			},
			attributes: ["id", "title", "post_content", "created_at"],
			include: [
			{
				model: User,
				attributes: ["username"],
			},
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
			],
		});
		if (!postData) {
			res.status(404).json({ message: "No post found with this id" });
			return;
		}
		const post = postData.get({ plain: true });
			res.render("editing-post", {
				post,
				username: req.session.username,
				logged_in: req.session.loggedIn,
			});
	} catch (err) {
		console.log(err);
		// returns a Server error response
		res.status(500).json(err);
	}
});

module.exports = router;