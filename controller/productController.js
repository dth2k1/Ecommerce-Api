const Product = require("../models/productModels");
const asyncHandler = require("express-async-handler");
//REST API

//getProduct
const getProduct = asyncHandler(async (req, res) => {
       const Product  = await Product.find({})
       if(!Product) return res.status(400).send("no anything Product")


       res.status(200).send(Product)
});
//createProduct
const postProduct = asyncHandler(async (req, res) => {
    const Product = new Product(req.body)
    await Product.save()
    res.status(201).send("product is save\n",Product)
    
});
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id,{
      $set:req.body
    },{new:true})
  if(!product) return res.status(400).send('Product not exist')
    res.status(200).send("Update success\n",product)
});
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if(!product) return res.status(400).send('not found product to delete')

  res.status(200).send("delete sucssesss\n",product)
});
module.exports = {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
};
