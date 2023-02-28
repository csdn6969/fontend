import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {useNavigate} from "react-router-dom"
import GetImageProduct from "../getImageProduct"
import { Order } from "../services/Api"
import { DELETE_ITEM_CART, UPDATE_CART } from "../shared/constants/action-type"
const Cart = () => {
    const [inputs, setInputs] = React.useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(({ Cart }) => {
        return Cart.items;
    })
    const onUpdateItem = (e, id)=>{
       const qty = e.target.value;
       if(qty <= 0){
    	// eslint-disable-next-line no-restricted-globals
        const isConfirm = confirm("ban muon xoa san pham")
        return isConfirm ? dispatch({
            type: DELETE_ITEM_CART,
            payload:{
                qty,
                id,
            }
        }) : dispatch({
            type: UPDATE_CART,
            payload: {
                qty :1,
                id,
            }
        })
       }
       dispatch({
        type: UPDATE_CART,
        payload:{
            qty,
            id,
        }
       })
    }
    const onDeleteItem =(e, id)=>{
        const qty = e.target.value;
        // eslint-disable-next-line no-restricted-globals
        const isConfirm = confirm("ban muon xoa san pham");
       return isConfirm ? dispatch({
            type: DELETE_ITEM_CART,
            payload:{
                qty,
                id,
            }
        }) : false;
    }
    const onChangeInput = (e)=>{
        const {name, value} = e.target;
        console.log(inputs);
        return setInputs(
           {
            ...inputs,
            [name]: value,
           }
        )
    }
    const onClickOrder = (e)=>{
        e.preventDefault();
        const items = cart?.map((item, index)=> ({prd_id: item._id, qty: item.qty}))
      Order({
        items, 
        ...inputs,
      }).then(({data})=>{
        if(data.status == "success"){
            return navigate("/Success")
        }
      })
    }
    return (
        <>
            <div id="cart">
                <div className="container">
                    <div className="row">
                        <div className="my-cart col-lg-8 col-md-12 col-12">
                            <div className="row title-item">
                                <div className="col-lg-5 col-md-5 col-5">Thông tin sản phẩm</div>
                                <div className="col-lg-4 col-md-4 col-4">Số lượng sản phẩm</div>
                                <div className="col-lg-3 col-md-3 col-3">Giá</div>
                            </div>
                                {
                                    cart?.map((item, index) => {
                                        return (
                                            <>
                                             <form>
                                                <div className="cart-item row">
                                                    <div className="cart-thumb col-lg-5 col-md-5 col-5">
                                                        <img src={GetImageProduct(item.image)} />
                                                        <p>{item.name}</p>
                                                    </div>
                                                    <div className="cart-quality col-lg-4 col-md-4 col-4">
                                                        <input onChange={(e)=> onUpdateItem(e, item._id)} className="form-control qty" type="number" value={item.qty}/>
                                                    </div>
                                                    <div className="price-product col-lg-3 col-md-3 col-3">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(((item.price) - (item.price * 0.34)) * (item.qty))}<br /><a onClick={(e)=>onDeleteItem(e, item._id)}>Xóa</a></div>
                                                </div>
                                                </form>
                                            </>

                                        )
                                    })
                                }
                                      <button onClick={(e)=>onUpdateItem(e,cart._id)} className="update-cart">Cập nhật giỏ hàng</button>
                        </div>
                    </div>
                   {/* Custtomer */}
                   <div id="customer">
                    <form method="post">
                        <div className="row">
                            <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                                <input 
                                   onChange={onChangeInput}
                                    placeholder="Họ và tên (bắt buộc)" 
                                    type="text" 
                                    name="name" 
                                    className="form-control" 
                                    value={inputs?.name}
                                    required />
                            </div>
                            <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                                <input 
                                   onChange={onChangeInput}
                                    placeholder="Số điện thoại (bắt buộc)" 
                                    type="text" 
                                    name="phone" 
                                    className="form-control" 
                                    value={inputs?.phone}
                                    required />
                            </div>
                            <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                                <input 
                                    onChange={onChangeInput}
                                    placeholder="Email (bắt buộc)" 
                                    type="text" 
                                    name="email" 
                                    className="form-control" 
                                    value={inputs?.email}
                                    required />
                            </div>
                            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                                <input 
                                onChange={onChangeInput}
                                    placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" 
                                    type="text" 
                                    name="address" 
                                    className="form-control" 
                                    value={inputs?.address}
                                    required />
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="by-now col-lg-6 col-md-6 col-sm-12">
                            <a onClick={onClickOrder} href="">
                                <b>Mua ngay</b>
                                <span>Giao hàng tận nơi siêu tốc</span>
                            </a>
                        </div>
                        <div className="by-now col-lg-6 col-md-6 col-sm-12">
                            <a href="#">
                                <b>Trả góp Online</b>
                                <span>Vui lòng call (+84) 0988 550 553</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* End customer */}
                </div>
            </div>
        </>
    )
}
export default Cart