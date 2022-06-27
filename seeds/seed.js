// seed the database with default data
require('dotenv').config({ path: __dirname + `/../.env` });
const sequelize = require('../config/connection');

const seedComment = require('./comment-seed');
const seedPost = require('./post-seed');
const seedUser = require('./user-seed');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUser();
    console.log('\n----- USERS SEEDED -----\n');

    await seedPost();
    console.log('\n----- POSTS SEEDED -----\n');

    await seedComment();
    console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};

seedAll();
