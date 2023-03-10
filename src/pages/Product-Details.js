import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment/moment"
import GetImageProduct from "../getImageProduct";
import { useNavigate } from "react-router-dom";
import { ADD_TO_CART } from "../shared/constants/action-type";
import { useDispatch } from "react-redux"
import { getComment, getProduct, createComment } from "../services/Api";
const ProductDetails = ({ item }) => {
    const params = useParams();
    const id = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = React.useState({});
    const [comments, setComments] = React.useState([])
    const [data, setData] = React.useState({});
    const getComments = (id) => {
        getComment(id, {}).then(({ data }) => {
            return setComments(data.data.docs)
        })
    }
    useEffect(() => {
        getProduct(id, {}).then(({ data }) => {
            console.log(id)
            return setProduct(data.data)
        })
        getComments(id)
    }, [id])
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        return setData({ ...data, [name]: value })
    }
    const onSubmitComments = (e) => {
        e.preventDefault()
        createComment(id, data, {}).then(({ data }) => {
            if (data.status === "success") {
                setData({})
            }
            getComment()
        })
    }
    const addToCart = (type) => {
        if (product) {
            const { image, price, name, qty, _id } = product;
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    _id,
                    image,
                    name,
                    price,
                    qty: 1,
                }
            })
        }
        if (type === "buy-now") {
            return navigate("/Cart")
        }
    }

    return (
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="details col-xl-6 col-lg-6 col-12">
                            <div className="product">
                                <div className="large">
                                    <img src={GetImageProduct(product?.image)} />
                                </div>
                            </div>
                            <div className="text-details">
                                <p> Nh???p tr???c ti???p t??? c??c nh?? ph??n ph???i Apple ch??nh h??ng t???i Vi???t Nam: Synnex FPT, Digiworld, D???u kh?? (Petrosetco), Viettel.</p>
                            </div>
                            <div className="text-details">
                                <p> B???o h??nh t???i trung t??m Apple VN</p>
                            </div>
                            {/* <div className="sales-policy">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-12" style={{ display: 'flex' }}>
                                        <p>B???o h??nh 12 th??ng ch??nh h??ng Apple t???i Vi???t Nam</p>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-12" style={{ display: 'flex' }}>
                                        <p>Giao h??ng mi???n ph?? n???i th??nh TP.HCM</p>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-12" style={{ display: 'flex' }}>
                                        <p>B??? s???n ph???m: H???p, S??ch h?????ng d???n, C??y l???y sim, C??p Lightning - Type C
                                        </p>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-12" style={{ display: 'flex' }}>
                                        <p>Tr??? tr?????c 30% qua Home Credit. Th??? t???c ch??? c???n CMND + GPLX;
                                            Ho???c tr??? g??p l??i su???t 0% qua th??? t??n d???ng Visa, Master, JCB.</p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="sales-policy">
                               <div className="sales-title"><img src="https://www.hnammobile.com/v10/images/icon-percent-orange.svg"/> ??u ????i s???n ph???m</div>
                               <div className="sales-main"><span>1</span>Gi???m ngay 700.000?? khi mua m??y kh??ng b???o h??nh (s??? l?????ng l???n li??n h??? 1800.6878) (Kh??ng ??p d???ng v???i c??c ch????ng tr??nh khuy???n m???i kh??c)</div>
                            </div>
                            <div className="sales-policy">
                               <div className="sales-title-2"><img src="https://stcv4.hnammobile.com/v10/images/icon-percent-blue.svg"/> ??u ????i c???a shop</div>
                               <div className="sales-main-2"><span>1</span>Gi???m 0.5% khi mua m??y n???u b???n l?? th??nh vi??n H-Member (kh??ng ??p d???ng v???i CTKM kh??c)</div>
                               <div className="sales-main-2"><span>2</span>Gi???m 0.5% khi mua m??y n???u b???n l?? th??nh vi??n H-Member (kh??ng ??p d???ng v???i CTKM kh??c)</div>
                            </div>
                        </div>
                        <div className="buy-addCart col-xl-6 col-lg-6 col-12">
                            <div className="name-product-details">
                                <h2>{product?.name}</h2>
                                <div>Tr??? g??p 0%</div>
                            </div>
                            <div className="price-product-details">
                                <div className="real-price">
                                    <h3>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((product?.price) - (product?.price * 0.34))}</h3>
                                    <div><span>-34%</span><del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</del></div>
                                </div>
                                <div className="installment-price">
                                    <div>Ch??? c???n tr??? tr?????c:</div>
                                    <p>9.000.000??</p>
                                </div>
                            </div>
                            <div className="details-promotion">
                                <div className="promotion-title"><img src="https://stcv4.hnammobile.com/v10/images/icon-bh.png" /> b???o h??nh-l???i ?????i ngay l???p t???c</div>
                                <div className="promotion-item"><span><img src="https://www.hnammobile.com/v10/images/icon-shield-tick-orange.svg" /></span>L???i 1 ?????i 1 l??n ?????n 90 ng??y</div>
                                <div className="promotion-item"><span><img src="https://www.hnammobile.com/v10/images/icon-shield-tick-orange.svg" /></span>B???o h??nh tr???c ti???p t???i shop<br />B???o h??nh to??n di???n, ngu???n, pin, m??n h??nh ti??u chu???n qu???c t???</div>
                                <div className="promotion-item"><span><img src="https://www.hnammobile.com/v10/images/icon-phone-orange.svg" /></span>Bao b??? m??n h??nh ch??? t??? 269.000??</div>
                                <div className="promotion-item"><span><img src="https://www.hnammobile.com/v10/images/icon-percent-orange.svg" /></span>Thu mua m??y c??. Nh???n voucher l??n ?????n 500.000??</div>
                                <div className="promotion-item"><span><img src="https://www.hnammobile.com/v10/images/icon-phone-orange.svg" /></span>C??i ?????t app, game b???n quy???n ch??? t??? 100.000??</div>
                            </div>
                            <div onClick={() => addToCart("buy-now")} className="buy-now"><button>Mua ngay</button></div>
                            <div onClick={addToCart} className="add-to-card"><button>Th??m v??o gi??? h??ng</button></div>
                            <div className="details-item col-12">
                                <div className="item">
                                    <h5>Th??ng tin s???n ph???m</h5>
                                    <button><a>Xem th??m</a></button>
                                </div>
                                <table>
                                    <tr>
                                        <th>M??n h??nh:</th>
                                        <td>OLED, 6.7", Super Retina XDR</td>
                                    </tr>
                                    <tr>
                                        <th>H??? ??i???u h??nh:</th>
                                        <td>Android</td>
                                    </tr>
                                    <tr>
                                        <th>Camera tr?????c:</th>
                                        <td>12 MP</td>
                                    </tr>
                                    <tr>
                                        <th>Camera sau:</th>
                                        <td>Ch??nh 48 MP & Ph??? 12 MP, 12 MP</td>
                                    </tr>
                                    <tr>
                                        <th>B??? nh??? trong:</th>
                                        <td>Snapdragon 960</td>
                                    </tr>
                                    <tr>
                                        <th>CPU:</th>
                                        <td>256 GB</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/*	Comment	*/}
                    <div id="comment" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>B??nh lu???n s???n ph???m</h3>
                            <form method="post">
                                <div className="form-group">
                                    <label>T??n:</label>
                                    <input
                                        onChange={onChangeInput}
                                        name="name"
                                        required type="text"
                                        className="form-control"
                                        value={data.name || ""} />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        onChange={onChangeInput}
                                        name="email"
                                        required type="email"
                                        className="form-control" id="pwd"
                                        value={data.email || ""} />
                                </div>
                                <div className="form-group">
                                    <label>N???i dung:</label>
                                    <textarea
                                        onChange={onChangeInput}
                                        name="content"
                                        required rows={8}
                                        className="form-control"
                                        value={data.content || ""} />
                                </div>
                                <button onClick={onSubmitComments} type="submit" name="sbm" className="btn btn-primary">G???i</button>
                            </form>
                        </div>
                    </div>
                    {/*	End Comment	*/}
                    {/*	Comments List	*/}
                    <div id="comments-list" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="comment-item">
                               
                                    {
                                        comments.map((value, index) => {
                                            const m = moment(value.createdAt)
                                            return (
                                                <ul>
                                                    <li><h5>{value.name}</h5></li>
                                                    <li>{m.fromNow()}</li>
                                                    <li>{value.content}</li>
                                                </ul>
                                            )
                                        })
                                    }
                              
                            </div>
                        </div>
                    </div>
                    {/*	End Comments List	*/}
                </div>
                {/*	End Product	*/}
            </div>
        </>

    )
}
export default ProductDetails