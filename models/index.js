//*
//* This sets up all the Sequelize database models
//*

// import database models here
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Each User has many Posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// Each Post belongs to one User
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

// Each Comment belongs to one User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

// Each Comment belongs to a Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

// Each User has many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

// Each Post can have many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

module.exports = {
    User,
    Post,
    Comment
};
