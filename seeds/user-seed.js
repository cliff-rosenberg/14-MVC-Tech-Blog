const { User } = require('../models');

const userData = [
    {
		"username": "Todd",
        "email": "toddster@todd.net",
		"password": "password1111"
	},
	{
		"username": "Thomas",
        "email": "thomas@tankengine.com",
		"password": "password2222"
	},
	{
		"username": "Edward",
        "email": "edward@scissor-hands.com",
		"password": "password3333"
	},
	{
		"username": "Millicent",
        "email": "millicent@fenwick.org",
		"password": "password4444"
	}
];

const seedUser = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUser;
