import Product, { IProduct } from "../models/product";

import cartProduct from "../models/cartProduct";

export default class productController {

    public async createProduct(body: any) {

        let productInfo: any;
       
            productInfo = await Product.create(body);
        


        return productInfo;

    }

    public async editProduct(body: IProduct, productId: string) {
        const productInfo: IProduct = await Product.findOneAndUpdate({ _id: productId, isDeleted: false }, body, { new: true }).lean();
        return productInfo;
    }

    public async getProductList(stateId: any) {
        const productList: IProduct[] = await Product.find({ stateId: stateId, isDeleted: false });
        return productList;
    }

    public async getProductInfoById(productId: any) {
        const productInfo: any = await Product.findOne({ _id: productId, isDeleted: false }).lean();
        return productInfo;
    }


    public async filterProduct(query:any){
        const pageSize = 10;
   const page = Number(query.pageNumber) || 1;
   const shopName = query.shopName || "";
   const categoryName = query.categoryName || "";
   const subCategoryName = query.subCategoryName || "";
   const subSubCategoryName = query.subSubCategoryName || "";
   const sportsBrand = query.sportsBrand || "";
 

   const subSubCategoryId=query.subSubCategoryId

   const min =
      query.min && Number(query.min) !== 0 ? Number(query.min) : 0;
   const max =
      query.max && Number(query.max) !== 0 ? Number(query.max) : 0;
   const rating =
      query.rating && Number(query.rating) !== 0
        ? Number(query.rating)
        : 0;
   const categoryFilter = categoryName ? { categoryName: { $regex: categoryName, $options: "i" } } : {};
   const subCategoryFilter = subCategoryName ? { subCategoryName: { $regex: subCategoryName, $options: "i" } } : {};
   const subSubCategoryFilter = subSubCategoryName ? { subSubCategoryName: { $regex: subSubCategoryName, $options: "i" } } : {};
   const sportsBrandFilter = sportsBrand ? { sportsBrand: { $regex: sportsBrand, $options: "i" } } : {};
   const shopNameFilter = shopName ? { shopName: { $regex: shopName, $options: "i" } } : {};
   const priceFilter = min && max ? { salePrice: { $gte: min, $lte: max } } : {};
   const ratingFilter = rating ? { rating: { $gte: rating } } : {};

   const count = await Product.count({
      ...subSubCategoryFilter,
      ...subCategoryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
      ...sportsBrandFilter,
      ...subSubCategoryId,
      ...shopNameFilter
    });
    const products = await Product.find({
        ...subSubCategoryFilter,
        ...subCategoryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
        ...sportsBrandFilter,
        ...subSubCategoryId,
        ...shopNameFilter
    })  
    .sort(query.sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
     return ({ products, page, pages: Math.ceil(count / pageSize), count });
    
}
    
 
public async searchProduct(search:any){
    let ProductInfo:any=await Product.aggregate(
    [
        {
          $search: {
            index: "search-text",
            text: {
              query: search,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ])
  return  ProductInfo 

}
    public async deleteProduct(productId: String) {
        const productInfo: IProduct = await Product.findOneAndUpdate({ _id: productId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return productInfo;
    }

    public async addtocart(body:any){
      let cartInfo:any
  cartInfo=await cartProduct.findOne({userId:body.userId,isDeleted:false}).lean()
  console.log(cartInfo,"cartInfo");
  
  if(cartInfo){
      cartInfo=await cartProduct.findOneAndUpdate({userId:body.userId,isDeleted:false},{
          $push:{
              cartProduct:{
                  productId:body.productId,
                  quantity:body.quantity
              }
          }
      }).lean()
  }else{
      cartInfo = await cartProduct.create(body);
  }
  
  
  
  return cartInfo
  }
  
  
  public async getcartlist(userId:any){
    console.log(userId);
    
  let cartInfo:any=await cartProduct.findOne({userId:userId,isDeleted:false}).lean();

  cartInfo=cartInfo.cartProduct

  let data:any=[]
  let  cartProduct1:any 
  for (let i = 0; i < cartInfo.length; i++) {
  cartProduct1 =  await Product.findOne({_id:cartInfo[i].productId})

  cartInfo[i].product=cartProduct1
  
   
   
  
  }




  return cartInfo
  
  
  
  
  }


  public async editCart(body:any){
let cartInfo:any=await cartProduct.findOneAndUpdate({userId:body.userId}, body, { new: true }).lean();
 return cartInfo 
}

  
  public async deleteCartProduct(body:any){
  let  cartInfo = await cartProduct.findOneAndUpdate(
      {
          userId: body.userId,
      },
      {
          $pull: {
            cartProduct: {
                  _id: body._id
              }
          }
      },{new:true})
      return cartInfo
  }
  
  public async buyProduct(userId:any){
    console.log(userId);
    
  let cartInfo:any=await cartProduct.findOne({userId:userId,isDeleted:false}).lean();

  cartInfo=cartInfo.cartProduct

  let data:any=[]
  let  cartProduct1:any 
  for (let i = 0; i < cartInfo.length; i++) {
  cartProduct1 =  await Product.findOne({_id:cartInfo[i].productId})

  cartInfo[i].product=cartProduct1
  
  }




  return cartInfo
  
  
  
  
  }


}