const router = require('express').Router();
const {getProduct,updateProduct,deleteProduct,postProduct} = require('../controller/productController')
const {register,auth} = require('../controller/authController')
const {getUser,updateUser,deleteUser,postUser} = require('../controller/userController')
const authMiddleware = require('../middleware/auth')
const admin = require('../middleware/admin')

///Product router
router.get('/api/getProduct',auth, getProduct);
router.post('/api/postProduct', postProduct);
router.delete('/api/deleteProduct/:id',[authMiddleware,admin], deleteProduct);
router.put('/api/updateProduct/:id', updateProduct);

//Auth router
router.post('/user/register',register);
router.post('/user/auth',auth);
// User router
router.get('/api/getUser',auth, getUser);
router.post('/api/postUser', postUser);
router.delete('/api/deleteUser/:id',[auth,admin], deleteUser);
router.put('/api/updateUser/:id', updateUser);
module.exports = router