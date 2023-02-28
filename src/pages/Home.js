import React, { useEffect } from "react"
import { getProducts } from "../services/Api";
import ProductsItem from "../component/ProductItem";
const Home = () => {
    const [products, setProducts] = React.useState([]);
    const [newProducts, setnewProducts] = React.useState([]);
    useEffect(() => {
        getProducts({
            params: {
                limit: 4
            }
        }).then(({ data }) => {
            return setProducts(data.data.docs)
        })
        getProducts({
            params: {
                limit: 4,
                "filter[is_featured]": true,
            }
        }).then(({ data }) => {
            return setnewProducts(data.data.docs);
        })

    }, [])
    return (
        <>
        <div className="view-more">
            <div className="container">
                <div className="row">
                <div className="view-more-text col-12">
                        <p className="name-custom">JENNIFER F., CASPER CUSTOMER</p>
                        <p className="title-custom">"Unbeatable price, and it’s <br/>super comfortable"</p>
                        <button>View More</button>
                    </div>
                </div>
            </div>
        </div>
            <div className="banner">
                <div className="container">
                    <div className="row">
                    <div className="banner-title col-12">
                            <h4>raise your expectations</h4>
                            <p>REFINED VIEWING EXPERIENCE</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="text col-lg-6 col-md-12 col-12">
                            <h4>
                                42 FRONT CAMERA FOR PERFECT SHOT
                            </h4>
                            <p>Porem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui official.
                            </p>
                            <p>Diam vulputate ut pharetra sit. Elit ut aliquam purus sit amet luctus venenatis lectus. Lorem dolor sed viverra ipsum nunc aliquet. Ut consequat semper viverra nam libero. Velit ut tortor aremn.</p>
                        </div>
                        <div className="photo col-lg-6 col-md-12 col-12">
                            <img src="https://cdn.shopify.com/s/files/1/0104/6917/9492/files/camera_1060x.jpg?v=1613704453" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-products">
                <div className="container">
                    <div className="row">
                        <h3 className="title col-12">sản phẩm bán chạy</h3>
                        <div className="products">
                            <div className="row">
                                {
                                    products.map((value, index) => {
                                        return (
                                            <ProductsItem item={value} />
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
                        <h3 className="title col-12">sản phẩm mới</h3>
                        <div className="products">
                            <div className="row">
                                {
                                    newProducts.map((value, index) => {
                                        return (
                                            <ProductsItem item={value} />
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
            </div>
        </>
    )
}
export default Home