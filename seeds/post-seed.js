const { Post } = require('../models');

const postData = [
    {
		"title": "Title of Post Number One",
		"post_content": "Content of post 1.",
		"user_id": 1
	},
	{
		"title": "Post Number Two",
		"post_content": "Content of post 2.",
		"user_id": 2
	},
	{
		"title": "Post Three",
		"post_content": "Content of post 3.",
		"user_id": 1
	},
	{
		"title": "Post Four",
		"post_content": "Content of post 4.",
		"user_id": 3
	}
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
