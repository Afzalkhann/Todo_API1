const express=require("express")
const app=express()
require('dotenv').config()
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser=require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerDefinition');
const pool=require('./utils/db')

const PORT=process.env.PORT || 3001

// middleware to parse incoming json

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json())
app.use(bodyParser.urlencoded())

app.use('/todos',todoRoutes)
app.use('/users',userRoutes)

app.get('/',(req,res)=>{
    res.send('Todo App back end')
})


const server =app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

// const gracefulShutdown = () => {
//     console.log('Shutting down gracefully...');
//     pool.end()
//         .then(() => {
//             console.log('Pool has ended');
//             process.exit(0); // Exit the process
//         })
//         .catch((err) => {
//             console.error('Error ending the pool', err);
//             process.exit(1); // Exit with an error code
//         });
// };

// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);

module.exports={app, server}