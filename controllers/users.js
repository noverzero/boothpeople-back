const User = require('../models/user');

//CRUD Controllers

//get all users

exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json({
                message: 'Fetched users successfully.',
                users: users
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            console.log(err);
        });
}

//get user by id
exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                const error = new Error('User not found.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'User fetched successfully.',
                user: user
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            console.log(err);
        });
}

//create user
exports.createUser = (req, res, next) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    User.create({
        email: email,
        firstName: firstName,
        lastName: lastName
    })
        .then(result => {
            console.log(`Created user: ${result}`);
            res.status(201).json({
                message: 'User created successfully.',
                user: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            console.log(err);
        });
}

//update user
exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const updatedEmail = req.body.email;
    const updatedFirstName = req.body.firstName;
    const updatedLastName = req.body.lastName;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                const error = new Error('User not found.');
                error.statusCode = 404;
                throw error;
            }
            user.email = updatedEmail;
            user.firstName = updatedFirstName;
            user.lastName = updatedLastName;
            return user.save();
        })
        .then(result => {
            console.log(`Updated user: ${result}`);
            res.status(200).json({
                message: 'User updated successfully.',
                user: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            console.log(err);
        });
}

//delete user
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                const error = new Error('User not found.');
                error.statusCode = 404;
                throw error;
            }
            return user.destroy();
        })
        .then(result => {
            console.log(`Deleted user: ${result}`);
            res.status(200).json({
                message: 'User deleted successfully.',
                user: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            console.log(err);
        });
}