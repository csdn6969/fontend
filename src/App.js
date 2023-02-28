import React, { useEffect } from "react"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Home from "./pages/Home"
import { getCategories, getProduct, getProducts } from "./services/Api"
import GetImageProduct from "./getImageProduct"
import { Provider } from "react-redux"
import store from "./redux-setup/store"
import Footer from "./component/Footer"
import Header from "./component/Header"
import ProductDetails from "./pages/Product-Details"
import Categories from "./pages/Categories"
import Search from "./pages/Search"
import Cart from "./pages/Cart"
import Slider from "./component/Slider"
import Success from "./pages/Success"
const App = ()=>{
  const [categories, setCategories] = React.useState([]);
  useEffect(()=>{
      getCategories({}).then(({data})=>{
        return setCategories(data.data.docs);
      })
  }, [])
  return (
    <>
   <Provider store={store}>
   <BrowserRouter>
    <Header item={categories}/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/productsDetails/:id" element={<ProductDetails item={categories}/>} />
      <Route path="/Categories/:id" element={<Categories/>} />
      <Route path="/Search" element ={<Search />}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/Success" element={<Success/>} />
    </Routes>
    <Footer />
    </BrowserRouter>
   </Provider>
    </>
  )
}
export default App