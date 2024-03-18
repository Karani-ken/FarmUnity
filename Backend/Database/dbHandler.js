const mysql = require('mysql')
const dbConfig = require('../Config/db.Config')
const queries = require('../Queries/queries')
const pool = mysql.createPool(dbConfig); /* connection pool is technique 
used to efficiently manage and reuse database connections improving performance */

const executeQuery = (query, values=[])=>{
    return new Promise((resolve, reject) =>{
        pool.query(query, values,(err, result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

// create a databse if  it doesn't exist already
const createDatabaseIfNotExists = async () =>{
    try {
        const result = await executeQuery(queries.showDatabases);              
        const DatabaseExists = result.length > 0;
        if(!DatabaseExists){
            await executeQuery(queries.createDatabase);
            console.log('database created successfully')
        }else{
            console.log('Database already exists');
        }
    } catch (error) {        
            throw error;        
    }
}
//create tables if they don't exist

const createTableIfNotExists = async ()=>{
    const tables = [
        { name: 'users', query: queries.showUsersTableQuery, createQuery: queries.createUserTableQuery },
        { name: 'products', query: queries.showProductsTable, createQuery: queries.createProductsTable },
        { name: 'posts', query: queries.showPostsTableQuery, createQuery: queries.postTable },
        { name: 'comments', query: queries.showCommentsTableQuery, createQuery: queries.commentsTable },
        { name: 'likes', query: queries.showLikesTableQuery, createQuery: queries.likesTable }
      ];
    try {
        for (const table of tables) {
            const tableInfo = await executeQuery(table.query);
            if (tableInfo.length === 0) {
              await executeQuery(table.createQuery);
              console.log(`${table.name} table was created successfully`);
            } else {
              console.log(`${table.name} table already exists`);
            }
          }
    } catch (error) {
       console.log(error)
    }
}

//insert a user 
const insertUser = async (userData) =>{
    const {name, email, password, phone,role,idPhoto, idNumber, county} = userData;
    try {
        await executeQuery(queries.insertUsersQuery, [name, email,password,phone,role,idNumber,idPhoto,county]);
        console.log('user added successfully')
    } catch (error) {
        console.log(error)
    }
}
//select a user by email
const selectUserByEmail = async (email) =>{
    try {
       const result = await executeQuery(queries.selectUserByEmail, [email]);           
        return result;
    } catch (error) {
        throw error;  
    }
}
//select a user by role
const selectUserByRole = async (role) =>{
    try {
       const result = await executeQuery(queries.selectUserByRole, [role]);           
        return result;
    } catch (error) {
        throw error;
    }
}
//select all users
const selectUsers = async () =>{
    try {
        const result = await executeQuery(queries.selectAllUsers);
        if(result.length > 0){
            return result;
        }else{
            console.log('no users in the table')
        }
    } catch (error) {
        throw error;
    }
}
//insert a new product to the database
const insertProduct = async (productData) =>{
    const {product_name, product_description, 
        product_price, product_rating, product_image, user_id} = productData;
        try {
            await executeQuery(queries.insertProducts, [product_name,product_description,
             product_price, product_rating, product_image, user_id])
             console.log("product added successfully");
            
        } catch (error) {
            throw error;
        }
}

// update a product
const updateProduct = async (product_id ,newProductData)=>{
    const {product_name, product_description, 
        product_price, product_rating, product_image,user_id} = newProductData;

        try {
            await executeQuery(queries.updateProduct,[product_name,product_description,
             product_price, product_rating, product_image, product_id, user_id])
             console.log("product updated successfully");
            
        } catch (error) {
            throw error;
        }
}
//delete a product
const deleteProduct = async (product_id)=>{
    try {
        await executeQuery(queries.deleteProduct, [product_id, user_id])        
        console.log(`The product with id ${product_id} has been deleted`);
    } catch (error) {
        throw error;
    }
}
    
//get products
const  getProducts = async ()=>{
    try {
        const result = await executeQuery(queries.getProducts);
        return result;
    } catch (error) {
        throw error
    }
}
//get product by id 
const getProductByID = async (product_id) =>{
    try {
        const result = await executeQuery(queries.getProductByID, [product_id])
        return result;
    } catch (error) {
        throw error;
    }
}
//get the product count
const getProductCount = async () =>{
    try {
        const result = await executeQuery(queries.getProductCount);
        return result;
    } catch (error) {
        throw error
    }
}
//Posts
//insert a post
const insertPost = async (postData) =>{
    const {title,content,image,user_id} = postData;
        try {
            await executeQuery(queries.createPost, [title,content,image,user_id])
             console.log("post was created successfully");
            
        } catch (error) {
            throw error;
        }
}
//initialize database
const initializeDatabase = async ()=>{
    try {
        await createDatabaseIfNotExists()
        await executeQuery(queries.useDatabaseQuery);
        await createTableIfNotExists();       
    } catch (error) {
        throw error;
    }
}

module.exports = {
    initializeDatabase,
    pool,
    insertUser,
    selectUserByEmail,
    selectUsers,
    selectUserByRole,
    insertProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductByID,
    getProductCount,
    insertPost
}