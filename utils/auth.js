// this is Express middleware for routes security
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  }; 
  
  module.exports = withAuth;