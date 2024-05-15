require('dotenv').config();
const express = require('express')
const cors = require('cors')
const dbHandler = require('./Database/dbHandler')
const authRoutes = require('./Routes/auth.routes')
const productRoutes = require('./Routes/products.routes')
const postsRoutes = require("./Routes/post.routes")
const orderRoutes = require("./Routes/order.routes")
const deliveries = require("./Routes/delivery.routes")
const rating = require("./Routes/rating.routes")
const app = express();
const port = process.env.PORT;
app.use(cors())
app.use(express.json())   

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
app.use("/deliveries", deliveries) 
app.use("/ratings", rating)
app.listen(port,()=>{
    console.log(`App started on http://localhost:${port}`);       
})     