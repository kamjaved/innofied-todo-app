const express = require('express')
const todoController = require('../controllers/todo')
const authController = require('../controllers/auth')

const router = express.Router({ mergeParams: true });

router.use(authController.protect)

router.get('/', todoController.getTodos)
router.get('/:id', todoController.getTodobyId)
router.post('/', todoController.addTodo)
router.patch('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)


module.exports = router