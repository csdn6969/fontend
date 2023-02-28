import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/Api";
import ProductsItem from "../component/ProductItem";
const Search = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = React.useState([]);
    const keyword = searchParams.get("keyword")
    useEffect(()=>{
        getProducts({
            params:{
                name: keyword,
            }
        }).then(({data})=>{
            console.log(keyword)
            setProducts(data.data.docs)
        })
    }, [keyword])
    return(
        <>
          <div className="main-products">
            <div className="container">
                <div className="row">
                    {
                        products.map((value, index)=>{
                            return(
                                <ProductsItem item={value}/>
                            )
                        })
                    }
                </div>
            </div>
          </div>
        </>
    )
}
export default Search