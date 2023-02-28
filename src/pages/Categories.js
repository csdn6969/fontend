import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import ProductsItem from "../component/ProductItem";
import { getCategory, getProductsCategory } from "../services/Api";
const Categories = ()=>{
    const [product,setProducts] = React.useState([]);
    const {id} = useParams();
    useEffect(()=>{
       console.log(id);
        getProductsCategory(id, {}).then(({data})=>{
            return setProducts(data.data.docs);
        })
    }, [id])
    return(
     <div className="main-products">
  <div className="container">
    <div className="row">
      <h3 className="title col-12">sản phẩm bán chạy</h3>
    </div>  
    <div className="products">
      <div className="row">
      {
        product.map((value, index)=>{
            return(
                <ProductsItem item={value}/>
            )
        })
      }
      </div>
      <div className="row">
      <div className="more-products">
        <button><a href>xem thêm <span className="more">+</span></a></button>
      </div>
      </div>
    </div>
  </div>
</div>
    )
}
export default Categories