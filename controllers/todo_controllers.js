
const pool = require('../utils/db');
const Todo = require('../models/todo');

// get all todos 
const getAllTodos= async (req,res)=>{
    try{
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        // Implement search functionality based on title
        const searchQuery=req.query.search ? `AND title like '%${req.query.search}%'`:''

        // Implement filtering based on completed status
        const completedFilter = req.query.completed ? `AND completed = ${req.query.completed}` : '';

        // Implement sorting based on createdAt
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder || 'ASC';
        const sortQuery = `ORDER BY ${sortBy} ${sortOrder}`;

        const query=`SELECT * FROM todos WHERE user_id=$1 ${searchQuery} ${completedFilter} ${sortQuery} LIMIT $2 OFFSET $3`;
        const result=await pool.query(query,[req.user.userId,limit,offset])
        // console.log(result)

        res.json(result.rows);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
//create new todo
const createTodo= async (req,res)=>{
    const {title,description}= req.body
    try{
        
        const query='insert into todos (user_id,title, description,completed,createdAt,updatedAt) values($1,$2,$3,$4,$5,$6) RETURNING * ';
       
        const values=[req.user.userId,title,description,false,new Date(), new Date()]
        const result= await pool.query(query,values)
        res.status(201).json(result.rows[0])
    }catch(err){
        res.status(500).json({error:err.message})
    }

}

//to update todo
const updateTodo= async (req,res)=>{
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const query =
            'UPDATE todos SET title = $1, description = $2, completed = $3, updatedat = $4 WHERE todo_id = $5 AND user_id = $6 RETURNING *';
        const values = [title, description, completed, new Date(), id, req.user.userId]; 
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
        }
        const updatedTodo = new Todo(
            result.rows[0].todo_id,
            result.rows[0].user_id,
            result.rows[0].title,
            result.rows[0].description,
            result.rows[0].completed,
            result.rows[0].created_at,
            result.rows[0].updated_at
        );
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//to delete todo
const deleteTodo= async (req,res)=>{
    const { id } = req.params;
    try {
        const query = 'DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *';
        const values = [id, req.user.userId]; 
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
        }
        const deletedTodo = new Todo(
            result.rows[0].todo_id,
            result.rows[0].user_id,
            result.rows[0].title,
            result.rows[0].description,
            result.rows[0].completed,
            result.rows[0].created_at,
            result.rows[0].updated_at
        );
        res.json({ message: 'Todo deleted', deletedTodo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

module.exports ={
    getAllTodos,
    updateTodo,
    createTodo,
    deleteTodo
}