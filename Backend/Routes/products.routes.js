const express = require('express')
const { protect } = require('../Middlewares/auth.middleware')
const { addProduct,
    updateProduct,
    getProducts,
    updateProductStatus,
    deleteProduct,
    getUserProducts
} = require('../Controllers/product.controller');
const upload = require('../Middlewares/uploads.middleware');
const router = express.Router();

router.post('/addproduct', upload.single("product_image"), addProduct);
router.put('/update-product/:id', updateProduct);
router.get('/get-products', getProducts);
router.delete('/delete/:id', deleteProduct);
router.put('update-status/id',updateProductStatus)
router.get('my-products/:id', getUserProducts)

module.exports = router