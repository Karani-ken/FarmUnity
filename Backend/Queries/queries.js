const dbConfig = require('../Config/db.Config');

const createDatabase = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`;
const showDatabases = `SHOW DATABASES LIKE "${dbConfig.database}"`;

// Users queries
const showUsersTableQuery = 'SHOW TABLES LIKE "users"';
const createUserTableQuery = `CREATE TABLE users (
    ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone INT,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    county VARCHAR(255),
    idNumber INT,
    idPhoto VARCHAR(255),  
    profilePic VARCHAR(255),
    address VARCHAR(255) 
)`;
const useDatabaseQuery = `USE ${dbConfig.database}`;
const insertUsersQuery = 'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)';
const selectUserByEmail = 'SELECT * FROM users WHERE email = ?';
const selectUserByRole = 'SELECT * FROM users WHERE role = ?';
const selectAllUsers = 'SELECT * FROM users';
const selectUserById = `SELECT * FROM users WHERE ID = ?`
const updateUsers = `UPDATE users
SET name = ?, 
    email = ?, 
    phone = ?,      
    county = ?,     
    profilePic = ?, 
    address = ?
WHERE ID = ?;
`
const deleteUser = `DELETE FROM users
WHERE ID = ?;
`

// Products queries
const showProductsTable = 'SHOW TABLES LIKE "Products"';
const createProductsTable = `CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(255),
    product_description TEXT,   
    product_image VARCHAR(255),
    product_price DECIMAL(10, 2),   
    user_id INT NOT NULL,
    product_status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(ID) ON DELETE CASCADE
)`;
const insertProducts = `INSERT INTO Products (product_name, product_description, product_price, product_image, product_status, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
const updateProduct = `UPDATE Products
  SET product_name = ?,
      product_description = ?,     
      product_image = ?,
      product_price = ?
  WHERE product_id = ? AND
  user_id = ?`;
const updateProductStatus = `
  UPDATE Products SET product_status = ? WHERE product_id = ?`
const getUserProducts = `SELECT DISTINCT product_name FROM Products WHERE user_id = ?
`
const getProducts = `SELECT * FROM Products ORDER BY product_id ASC`;
const deleteProduct = `DELETE FROM Products WHERE product_id = ?`;
const getProductByID = `SELECT * FROM Products WHERE product_id = ? `;
const getProductCount = `SELECT COUNT(*) FROM Products`;
const getProductCategories = `SELECT DISTINCT product_name FROM Products WHERE user_id = ?`;

// Orders
// Orders
const showOrdersTable = 'SHOW TABLES LIKE "orders"';
const showOrderItemsTable = 'SHOW TABLES LIKE "orderitems"'; // Corrected table name
const createOrdersTable = `CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  stripeSessionId VARCHAR(255),
  paymentIntentId VARCHAR(255), 
  status VARCHAR(50)
);`

const createOrderItemsTable = `CREATE TABLE orderitems (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_image VARCHAR(255),
  product_price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);`

const createOrder = `INSERT INTO orders (user_id, status) VALUES (?, ?)`; // Only inserting core order details
const insertOrderItems = `INSERT INTO orderitems (order_id, product_id, product_name, product_image, product_price, quantity) VALUES (?, ?, ?, ?, ?, ?)`; // Inserting order items
const updateOrder = `UPDATE orders SET stripeSessionId = ?, status = ? WHERE order_id = ? AND user_id = ?`;
const confirmPayment = `UPDATE orders SET stripeSessionId = ?, paymentIntentId = ?, status = ? WHERE order_id = ? AND user_id = ?`; // Updating only relevant order details
const deleteOrder = `DELETE FROM orders WHERE order_id = ?`;
const fetchOrder = `SELECT * FROM orders WHERE user_id = ?`;
const fetchUnpaidUserOrders = `SELECT * FROM orders WHERE user_id = ? AND status = "pending"`;
const fetchOrderById = `SELECT * FROM orders WHERE order_id = ?`;
const fetchOrderWithOrderItems = `SELECT order_tbl.order_id, order_tbl.user_id, order_tbl.order_date, order_tbl.stripeSessionId, order_tbl.paymentIntentId, order_tbl.status,
order_item_tbl.order_item_id, order_item_tbl.product_id, order_item_tbl.product_name, order_item_tbl.product_image, order_item_tbl.product_price, order_item_tbl.quantity
FROM orders AS order_tbl
JOIN orderitems AS order_item_tbl ON order_tbl.order_id = order_item_tbl.order_id
WHERE order_tbl.order_id = ?;
`
const getFarmerOrders = `SELECT 
p.product_id, 
p.product_name, 
SUM(oi.quantity) AS total_quantity_bought,
SUM(oi.quantity * p.product_price) AS total_amount_sold
FROM 
orderitems oi
INNER JOIN 
orders o ON oi.order_id = o.order_id
INNER JOIN 
products p ON oi.product_id = p.product_id
WHERE 
p.user_id = ?
GROUP BY 
p.product_id, p.product_name;

`



// Posts queries
const showPostsTableQuery = 'SHOW TABLES LIKE "posts"';
const postTable = `CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,   
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
const createPost = `INSERT INTO posts (title, content,user_id) VALUES (?, ?, ?)`;
const getPosts = `SELECT * FROM posts`
// Comments queries
const showCommentsTableQuery = 'SHOW TABLES LIKE "comments"';
const commentsTable = `CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
)`;
const createComment = `INSERT INTO comments (post_id, content, user_id) VALUES (?, ?, ?)`;

// Likes queries
const showLikesTableQuery = 'SHOW TABLES LIKE "likes"';
const likesTable = `CREATE TABLE likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,    
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ,  
    UNIQUE KEY unique_like (post_id, user_id)
)`;
const likePost = `INSERT INTO likes (post_id, user_id) VALUES (?, ?)`;

//DELIVERIES
//show deliveries table
const showDeliveriesTable = 'SHOW TABLES LIKE "deliveries"';
//create delivery table
const deliveryTable = `
  CREATE TABLE deliveries (
    delivery_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNIQUE,
    customer_id INT,
    status VARCHAR(100),
    company_id INT,
    pickup_station VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (customer_id) REFERENCES users(ID),
    FOREIGN KEY (company_id) REFERENCES users(ID)
);`
//insert into deliveries table
const insertDelivery =`INSERT INTO deliveries (order_id, customer_id, status, company_id, pickup_station)
VALUES (?, ?, ?, ?, ?);
`
//get customer deliveries
const getCustomerDeliveries = `SELECT * FROM deliveries WHERE customer_id = ?;`
//get company deliveries
const getCompanyDeliveries = `SELECT * FROM deliveries WHERE company_id = ?;`
//get delivery by delivery id
const getDeliveryById = `SELECT * FROM deliveries WHERE delivery_id = ?;`
//update delivery status
const deliveryStatusUpdate = `UPDATE deliveries  
SET status = ?
WHERE delivery_id = ?;`
//delete cancelled orders
const deleteDelivery = `DELETE FROM deliveries
WHERE delivery_id = ? AND status = 'cancel';`

//FeedBack
const showRatingsTable = 'SHOW TABLES LIKE "ratings"';
const ratingTable = `CREATE TABLE ratings(
  rating_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  rating INT(5),
  FOREIGN KEY (user_id) REFERENCES users(ID)
);`
const insertRating = `INSERT INTO ratings (user_id, rating)
VALUES (?,?)`




module.exports = {
  createDatabase,
  showDatabases,
  showUsersTableQuery,
  createUserTableQuery,
  createOrdersTable,
  useDatabaseQuery,
  insertUsersQuery,
  selectUserByEmail,
  selectUserByRole,
  createProductsTable,
  insertProducts,
  showProductsTable,
  deleteProduct,
  selectAllUsers,
  updateProduct,
  getProducts,
  getProductByID,
  getProductCount,
  getProductCategories,
  createOrder,
  updateOrder,
  deleteOrder,
  fetchOrder,
  fetchUnpaidUserOrders,
  showPostsTableQuery,
  showCommentsTableQuery,
  showLikesTableQuery,
  postTable,
  commentsTable,
  likesTable,
  createPost,
  createComment,
  likePost,
  showOrdersTable,
  fetchOrderById,
  createOrderItemsTable,
  showOrderItemsTable,
  insertOrderItems,
  fetchOrderWithOrderItems,
  confirmPayment,
  selectUserById,
  updateUsers,
  deleteUser,
  updateProductStatus,
  getUserProducts,
  getPosts,
  deliveryTable,
  deliveryStatusUpdate,
  getCompanyDeliveries,
  getDeliveryById,
  getCustomerDeliveries,
  insertDelivery,
  deleteDelivery,
  showDeliveriesTable,
  showRatingsTable,
  ratingTable,
  insertRating,
  getFarmerOrders
};  
