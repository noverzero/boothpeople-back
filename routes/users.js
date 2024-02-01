const Controllers = require('../controllers/users');
const router = require('express').Router();

//CRUD Routes /users
router.get('/', Controllers.getUsers); // /users
router.get('/:userId', Controllers.getUser); // /users/:userId
router.post('/', Controllers.createUser); // /users
router.put('/:userId', Controllers.updateUser); // /users/:userId
router.delete('/:userId', Controllers.deleteUser); // /users/:userId

module.exports = router;
