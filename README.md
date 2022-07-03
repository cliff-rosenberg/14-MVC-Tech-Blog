# 14-MVC-Tech-Blog

## Table of Contents-
- [Tech Blog using MVC Format](#mvc-tech-blog)
  - [Table of Contents-](#table-of-contents-)
  - [Licensing](#licensing)
  - [Description](#description)
  - [Installation](#installation)
  - [Screenshots](#screenshots)
  - [Usage](#usage)
  - [Credits](#credits)
  - [Contributing](#contributing)
  - [Testing](#testing)
  - [Additional Info](#additional-info)

## Licensing

[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

Link: [MIT License](https://opensource.org/licenses/MIT)

## Description

This is a simple blog using the Model-View-Controller 
     
## Installation

Project is hosted on Heroku at: 

Can also be installed locally by copying directory structure as-is, then doing a npm install in the base directory to install necessary dependancies. Application database is MySql, and the database container can be created by navigating to the `/db` directory and then using the MySQL command line utility and the `SOURCE` command to create it. Data tables can be seeded into the container after this my navigating to the `/seeds` directory and using the command `node seed.js` to create them.

## Screenshots

Base page
![./assets/images/screenshot1.png](./assets/images/screenshot1.png)

User login page
![./assets/images/screenshot4.png](./assets/images/screenshot4.png)

User now logged in
![./assets/images/screenshot2.png](./assets/images/screenshot2.png)

Add a comment to a post
![./assets/images/screenshot3.png](./assets/images/screenshot3.png)

User 'Dashboard' page
![./assets/images/screenshot5.png](./assets/images/screenshot5.png)

Editing a post
![./assets/images/screenshot6.png](./assets/images/screenshot6.png)

User sign-up page
![./assets/images/screenshot7.png](./assets/images/screenshot7.png)

## Usage

To run locally: The app server is launched by Node, type the command 'node server.js' to start the back-end. Then launch a web browser and go to the URL 'localhost:3001/' to get the inital page.

## Credits

This application uses the following technologies/libraries:  

[Express.js v4.0](https://expressjs.com/)

[Sequelize v6](https://sequelize.org/)

[MySQL v8.0](https://www.mysql.com/)

[dotenv](https://www.npmjs.com/package/dotenv)


## Contributing

  [Contributor Covenant](https://www.contributor-covenant.org/)

## Testing

  No testing is provided.

## Additional Info

- Github: [cliff-rosenberg](https://github.com/cliff-rosenberg)
- Email: cliff459 AT icloud.com