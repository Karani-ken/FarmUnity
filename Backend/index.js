require('dotenv').config();
const express = require('express')
const cors = require('cors')
const dbHandler = require('./Database/dbHandler')
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/auth.routes')
const productRoutes = require('./Routes/products.routes')
const postsRoutes = require("./Routes/post.routes")
const orderRoutes = require("./Routes/order.routes")
const app = express();
app.use(cors())
const port = process.env.PORT;
app.use(bodyParser.json())

//connect to a database
dbHandler.pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log("MySQL connected successfully");   
    dbHandler.initializeDatabase()
    .then(()=>{
       connection.release()                
    })
    .catch((err)=>{   
        connection.release();   
        throw err;    
    })
})   
app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/posts',postsRoutes)
app.use('/orders', orderRoutes)    
app.listen(port,()=>{
    console.log(`App started on http://localhost:${port}`);       
})