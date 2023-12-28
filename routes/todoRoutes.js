const express=require('express')
const router=express.Router()
const todoControllers=require('../controllers/todo_controllers')
const { authenticateUser } = require('../middleware/auth')

//route to get all the todos
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     description: Retrieve all todos for the authenticated user with optional pagination, search, filtering, and sorting.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search string for filtering todos by title
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter todos by completion status (true/false)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., 'createdAt')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Sort order ('ASC' or 'DESC')
 *     responses:
 *       '200':
 *         description: A list of todos retrieved successfully
 */
router.get('/',authenticateUser,todoControllers.getAllTodos);


// route to create a todo
/**
 * @swagger
 * /todos:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new todo
 *     description: Create a new todo for the authenticated user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the todo
 *               description:
 *                 type: string
 *                 description: Description of the todo
 *     responses:
 *       '201':
 *         description: Todo created successfully
 */
router.post('/',authenticateUser,todoControllers.createTodo);


// route to update todo
/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     description: Update a specific todo for the authenticated user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the todo
 *               description:
 *                 type: string
 *                 description: New description for the todo
 *               completed:
 *                 type: boolean
 *                 description: New completion status for the todo
 *     responses:
 *       '200':
 *         description: Todo updated successfully
 *       '404':
 *         description: Todo not found or unauthorized
 */
router.put('/:id',authenticateUser, todoControllers.updateTodo);
// route to delete a todo

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Delete a specific todo for the authenticated user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the todo to delete
 *     responses:
 *       '200':
 *         description: Todo deleted successfully
 *       '404':
 *         description: Todo not found or unauthorized
 */

router.delete('/:id',authenticateUser,todoControllers.deleteTodo)

module.exports=router

