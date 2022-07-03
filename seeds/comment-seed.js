const { Comment } = require('../models');

const commentData = [
	{
		"comment_body": "Here is a comment for post 1 by user 4",
		"post_id": 1,
		"user_id": 4
	},
	{
		"comment_body": "Here is a comment for post 4 by user 2",
		"post_id": 4,
		"user_id": 2
	},
	{
		"comment_body": "Here is a comment for post 2 by user 1",
		"post_id": 2,
		"user_id": 1
	},
	{
		"comment_body": "Here is a comment for post 2 by user 3",
		"post_id": 2,
		"user_id": 3
	}
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
