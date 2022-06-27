const { User } = require('../models');

const userData = [
    {
		"username": "cliff",
        "email": "cliff@cliffaudio.com",
		"password": "password1234"
	},
	{
		"username": "thomas",
        "email": "thomas@tankengine.com",
		"password": "password4321"
	},
	{
		"username": "edward",
        "email": "edward@scissor-hands.com",
		"password": "password9999"
	},
	{
		"username": "millicent",
        "email": "millicent@fenwick.org",
		"password": "password5555"
	}
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
