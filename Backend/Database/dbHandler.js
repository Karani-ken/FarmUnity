const mysql = require('mysql')
const dbConfig = require('../Config/db.Config')
const queries = require('../Queries/queries')
const pool = mysql.createPool(dbConfig); /* connection pool is technique 
used to efficiently manage and reuse database connections improving performance */

const executeQuery = (query, values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

// create a databse if  it doesn't exist already
const createDatabaseIfNotExists = async () => {
    try {
        const result = await executeQuery(queries.showDatabases);
        const DatabaseExists = result.length > 0;
        if (!DatabaseExists) {
            await executeQuery(queries.createDatabase);
            console.log('database created successfully')
        } else {
            console.log('Database already exists');
        }
    } catch (error) {
        throw error;
    }
}
//create tables if they don't exist

const createTableIfNotExists = async () => {
    const tables = [
        { name: 'users', query: queries.showUsersTableQuery, createQuery: queries.createUserTableQuery },
        { name: 'products', query: queries.showProductsTable, createQuery: queries.createProductsTable },
        { name: 'posts', query: queries.showPostsTableQuery, createQuery: queries.postTable },
        { name: 'comments', query: queries.showCommentsTableQuery, createQuery: queries.commentsTable },
        { name: 'likes', query: queries.showLikesTableQuery, createQuery: queries.likesTable },
        { name: 'orders', query: queries.showOrdersTable, createQuery: queries.createOrdersTable },
        { name: 'orderitems', query: queries.showOrderItemsTable, createQuery: queries.createOrderItemsTable }
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
const insertUser = async (userData) => {
    const { name, email, password, phone, role, idPhoto, idNumber, county } = userData;
    try {
        await executeQuery(queries.insertUsersQuery, [name, email, password, phone, role, idNumber, idPhoto, county]);
        console.log('user added successfully')
    } catch (error) {
        console.log(error)
    }
}
//select a user by email
const selectUserByEmail = async (email) => {
    try {
        const result = await executeQuery(queries.selectUserByEmail, [email]);
        return result;
    } catch (error) {
        throw error;
    }
}
//select a user by role
const selectUserByRole = async (role) => {
    try {
        const result = await executeQuery(queries.selectUserByRole, [role]);
        return result;
    } catch (error) {
        throw error;
    }
}
//select all users
const selectUsers = async () => {
    try {
        const result = await executeQuery(queries.selectAllUsers);
        if (result.length > 0) {
            return result;
        } else {
            console.log('no users in the table')
        }
    } catch (error) {
        console.log(error)
    }
}
const selectUserById = async (ID) => {
    try {
        const result = await executeQuery(queries.selectUserById, [ID])

        if (result.length > 0) {
            return result;
        } else {
            console.log('user not found!!')
        }
    } catch (error) {
        console.log(error)
    }
}

//Update user 
const updateUser = async (ID, updatedUserData) => {
    try {
        const { name, email, phone, profilePic, county, address } = updatedUserData;
        await executeQuery(queries.updateUsers, [name, email, phone, county, profilePic, address, ID])
        return "profile was updated"
    } catch (error) {
        console.log(error)
    }

}
//insert a new product to the database
const insertProduct = async (productData) => {
    const { product_name, product_description,
        product_price, product_image, product_status, user_id } = productData;
    try {
        await executeQuery(queries.insertProducts, [product_name, product_description,
            product_price, product_image, product_status, user_id])
        console.log("product added successfully");

    } catch (error) {
        throw error;
    }
}

// update a product
const updateProduct = async (product_id, newProductData) => {
    const { product_name, product_description,
        product_price, product_rating, product_image, user_id } = newProductData;

    try {
        await executeQuery(queries.updateProduct, [product_name, product_description,
            product_price, product_rating, product_image, product_id, user_id])
        console.log("product updated successfully");

    } catch (error) {
        throw error;
    }
}
//delete a product
const deleteProduct = async (product_id) => {
    try {
        await executeQuery(queries.deleteProduct, [product_id])
        console.log(`The product with id ${product_id} has been deleted`);
    } catch (error) {
        throw error;
    }
}

//get products
const getProducts = async () => {
    try {
        const result = await executeQuery(queries.getProducts);
        return result;
    } catch (error) {
        throw error
    }
}
//get product by id 
const getProductByID = async (product_id) => {
    try {
        const result = await executeQuery(queries.getProductByID, [product_id])
        return result;
    } catch (error) {
        throw error;
    }
}
//get the product count
const getProductCount = async () => {
    try {
        const result = await executeQuery(queries.getProductCount);
        return result;
    } catch (error) {
        throw error
    }
}

//update product quantity on purchase
const updateProductStatus = async (product_status, product_id) => {
    try {
        await executeQuery(queries.updateProductStatus, [product_status, product_id])

    } catch (error) {
        console.error(error)
    }

}
//SELECT USER PRODUCTS
const getuserProducts = async (user_id) => {
    try {
        const result = await executeQuery(queries.getUserProducts, [user_id])
        return result;
    } catch (error) {
        console.log(error)
    }
}

//CART handling
//Create order
const createOrder = async (orderData, orderItemsData) => {
    const { user_id, status } = orderData;
    try {
        // Insert into orders table
        const orderResult = await executeQuery(queries.createOrder, [user_id, status]);
        const orderId = orderResult.insertId; // Get the generated order_id

        // Insert into order_items table   
        for (const itemData of orderItemsData) {
            const { product_id, product_name, product_image, product_price, quantity } = itemData;
            await executeQuery(queries.insertOrderItems, [orderId, product_id, product_name, product_image, product_price, quantity]);
        }

        console.log("Order was placed successfully");
    } catch (error) {
        console.log(error);
    }
};

//update order
const updateOrder = async (updatedOrder) => {
    try {
        const { stripeSessionId, status, order_id, user_id } = updatedOrder;
        await executeQuery(queries.updateOrder, [stripeSessionId, status, order_id, user_id]);
        console.log("Order payment was successfull");
    } catch (error) {
        console.log(error);
    }
};
const confirmPayment = async (updatedOrder) => {
    try {
        const { stripeSessionId, paymentIntentId, status, order_id, user_id } = updatedOrder;
        await executeQuery(queries.confirmPayment, [stripeSessionId, paymentIntentId, status, order_id, user_id]);
        console.log("payment was confirmed successfully");
    } catch (error) {
        console.log(error);
    }
};

//delete order
const deleteOrder = async (order_id) => {
    try {
        await executeQuery(queries.deleteOrder, [order_id]);
        console.log("Order was deleted successfully")
    } catch (error) {
        console.log(error)
    }
}
//get all orders
const fetchAllOrders = async (user_id) => {
    try {
        const result = await executeQuery(queries.fetchOrder, [user_id])
        return result;
    } catch (error) {
        console.log(error)
    }

}
//get unpaid orders
const fetchUnpaidOrders = async (user_id) => {
    try {
        const result = await executeQuery(queries.fetchUnpaidUserOrders, [user_id])
        return result;
    } catch (error) {
        console.log(error)
    }
}
//get order by id
const fetchOrderById = async (order_id) => {
    try {
        const result = await executeQuery(queries.fetchOrderById, [order_id])
        return result;
    } catch (error) {
        console.log(error)
    }
}
const orderWithItems = async (order_id) => {
    try {
        const result = await executeQuery(queries.fetchOrderWithOrderItems, [order_id])
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
    }
}

//Posts
//insert a post
const insertPost = async (postData) => {
    const { title, content, user_id } = postData;
    try {
        await executeQuery(queries.createPost, [title, content, user_id])
        console.log("post was created successfully");

    } catch (error) {
        console.log(error)
    }
}
const getAllPosts = async () => {
    try {
        const response = await executeQuery(queries.getPosts);
        return response;
    } catch (error) {
        console.log(error)
    }   

}
//initialize database
const initializeDatabase = async () => {
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
    insertPost,
    createOrder,
    updateOrder,
    deleteOrder,
    fetchAllOrders,
    fetchUnpaidOrders,
    fetchOrderById,
    orderWithItems,
    confirmPayment,
    selectUserById,
    updateUser,
    updateProductStatus,
    getuserProducts,
    getAllPosts
}