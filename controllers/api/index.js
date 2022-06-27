//*
//* This is the setup for the '/api/' routes
//*
// set up Express router
const router = require('express').Router();

// set up route files here
const userRoutes = require('./userRoutes');

// then set up Express router with all routes
router.use('/users', userRoutes);

// export
module.exports = router;
