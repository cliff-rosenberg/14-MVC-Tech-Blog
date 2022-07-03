const { Post } = require('../models');

const postData = [
    {
		"title": "Post Number One Title",
		"post_content": "This is the content of post 1.",
		"user_id": 1
	},
	{
		"title": "Post Number Two Title",
		"post_content": "This is the content of post 2.",
		"user_id": 2
	},
	{
		"title": "Post Number Three Title",
		"post_content": "This is the content of post 3.",
		"user_id": 1
	},
	{
		"title": "Post Number Four Title",
		"post_content": "This is the content of post 4.",
		"user_id": 3
	}
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
