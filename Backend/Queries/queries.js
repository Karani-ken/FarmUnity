const dbConfig = require('../Config/db.Config')
const createDatabase = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
const showDatabases = `SHOW DATABASES LIKE "${dbConfig.database}"`
//users queries
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

)
`
const useDatabaseQuery = `USE ${dbConfig.database}`;
const insertUsersQuery = 'INSERT INTO users (name, email,password,phone,role) VALUES (?, ?, ?, ?,?)';
const selectUserByEmail = 'SELECT * FROM users WHERE email = ?'
const selectUserByRole = 'SELECT * FROM users WHERE role = ? '
const selectAllUsers = 'SELECT * FROM users'
//products queries
const showProductsTable = 'SHOW TABLES LIKE "Products"';
const createProductsTable = `CREATE TABLE Products (
    product_id INT  AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(255),
    product_description TEXT,
    product_rating FLOAT,
    product_image VARCHAR(255),
    product_price DECIMAL(10, 2),   
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(ID) ON DELETE CASCADE
);`

const insertProducts = `INSERT INTO Products (product_name, product_description, product_rating, product_image, product_price, user_id)
VALUES (?, ?, ?, ?, ?, ?)
`
const updateProduct = `  UPDATE Product
  SET product_name = ?,
      product_description = ?,
      product_rating = ?,  
      product_image = ?,
      product_price = ?
  WHERE product_id = ? AND
  user_id = ? ;
`;
const getProducts = `SELECT * FROM Product ORDER BY product_id ASC`
const deleteProduct = `DELETE FROM Products WHERE product_id = ? AND user_id = ?`
const getProductByID = `SELECT * FROM products WHERE product_id = ? AND user_id = ?`
const getProductCount = `SELECT COUNT() FROM products`

//posts queries
const showPostsTableQuery = 'SHOW TABLES LIKE "posts"';
const postTable = `CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255),
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `
  const createPost = `INSERT INTO posts (title, content, image, user_id) VALUES(?, ?, ?, ?) `

//comments queires
const showCommentsTableQuery = 'SHOW TABLES LIKE "comments"';
const commentsTable = `CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
  )
  `
const createComment = `INSERT INTO comments (post_id,content,user_id) VALUES (?, ?, ?, ?)`
//likes queries
const showLikesTableQuery = 'SHOW TABLES LIKE "likes"';
const likesTable = `CREATE TABLE likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,    
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ,  
    UNIQUE KEY unique_like (post_id, user_id)
  )
  `
  const likePost = `INSERT INTO likes (post_id,user_id) VALUES (?, ?)`
module.exports = {
    createDatabase,
    showDatabases,
    showUsersTableQuery,
    createUserTableQuery,
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
    showPostsTableQuery,
    showCommentsTableQuery,
    showLikesTableQuery,
    postTable,
    commentsTable,
    likesTable,
    createPost,
    createComment,
    likePost
}