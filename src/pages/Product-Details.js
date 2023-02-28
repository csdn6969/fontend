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
                                <p> Nhập trực tiếp từ các nhà phân phối Apple chính hãng tại Việt Nam: Synnex FPT, Digiworld, Dầu khí (Petrosetco), Viettel.</p>
                            </div>
                            <div className="text-details">
                                <p> Bảo hành tại trung tâm Apple VN</p>
                            </div>
                            {/* <div className="sales-policy">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-12" style={{ display: 'flex' }}>
                                        <p>Bảo hành 12 tháng chính hãng Apple tại Việt Nam</p>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-12" style={{ display: 'flex' }}>
                                        <p>Giao hàng miễn phí nội thành TP.HCM</p>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-12" style={{ display: 'flex' }}>
                                        <p>Bộ sản phẩm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type C
                                        </p>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-12" style={{ display: 'flex' }}>
                                        <p>Trả trước 30% qua Home Credit. Thủ tục chỉ cần CMND + GPLX;
                                            Hoặc trả góp lãi suất 0% qua thẻ tín dụng Visa, Master, JCB.</p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="sales-policy">
                               <div className="sales-title"><img src="https://www.hnammobile.com/v10/images/icon-percent-orange.svg"/> ưu đãi sản phẩm</div>
                               <div className="sales-main"><span>1</span>Giảm ngay 700.000đ khi mua máy không bảo hành (số lượng lớn liên hệ 1800.6878) (Không áp dụng với các chương trình khuyến mại khác)</div>
                            </div>
                            <div className="sales-policy">
                               <div className="sales-title-2"><img src="https://stcv4.hnammobile.com/v10/images/icon-percent-blue.svg"/> ưu đãi của shop</div>
                               <div className="sales-main-2"><span>1</span>Giảm 0.5% khi mua máy nếu bạn là thành viên H-Member (không áp dụng với CTKM khác)</div>
                               <div className="sales-main-2"><span>2</span>Giảm 0.5% khi mua máy nếu bạn là thành viên H-Member (không áp dụng với CTKM khác)</div>
                            </div>
                        </div>
                        <div className="buy-addCart col-xl-6 col-lg-6 col-12">
                            <div className="name-product-details">
                                <h2>{product?.name}</h2>
                                <div>Trả góp 0%</div>
                            </div>
                            <div className="price-product-details">
                                <div className="real-price">
                                    <h3>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((product?.price) - (product?.price * 0.34))}</h3>
                                    <div><span>-34%</span><del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</del></div>
                                </div>
                                <div className="installment-price">
                                    <div>Chỉ cần trả trước:</div>
                                    <p>9.000.000đ</p>
                                </div>
                            </div>
                            <div className="details-promotion">
                                <div className="promotion-title"><img src="https://stcv4.hnammobile.com/v10/images/icon-bh.png" /> bảo hành-lỗi đổi ngay lập tức</div>
                                <div className="promotion-item"><span><img src="https://www.hnammobile.com/v10/images/icon-shield-tick-orange.svg" /></span>Lỗi 1 đổi 1 lên đến 90 ngày</div>
                                <div className="promotion-item"><span><img src="https://www.hnammobile.com/v10/images/icon-shield-tick-orange.svg" /></span>Bảo hành trực tiếp tại shop<br />Bảo hành toàn diện, nguồn, pin, màn hình tiêu chuẩn quốc tế</div>
                                <div className="promotion-item"><span><img src="https://www.hnammobile.com/v10/images/icon-phone-orange.svg" /></span>Bao bể màn hình chỉ từ 269.000đ</div>
                                <div className="promotion-item"><span><img src="https://www.hnammobile.com/v10/images/icon-percent-orange.svg" /></span>Thu mua máy cũ. Nhận voucher lên đến 500.000đ</div>
                                <div className="promotion-item"><span><img src="https://www.hnammobile.com/v10/images/icon-phone-orange.svg" /></span>Cài đặt app, game bản quyền chỉ từ 100.000đ</div>
                            </div>
                            <div onClick={() => addToCart("buy-now")} className="buy-now"><button>Mua ngay</button></div>
                            <div onClick={addToCart} className="add-to-card"><button>Thêm vào giỏ hàng</button></div>
                            <div className="details-item col-12">
                                <div className="item">
                                    <h5>Thông tin sản phẩm</h5>
                                    <button><a>Xem thêm</a></button>
                                </div>
                                <table>
                                    <tr>
                                        <th>Màn hình:</th>
                                        <td>OLED, 6.7", Super Retina XDR</td>
                                    </tr>
                                    <tr>
                                        <th>Hệ điều hành:</th>
                                        <td>Android</td>
                                    </tr>
                                    <tr>
                                        <th>Camera trước:</th>
                                        <td>12 MP</td>
                                    </tr>
                                    <tr>
                                        <th>Camera sau:</th>
                                        <td>Chính 48 MP & Phụ 12 MP, 12 MP</td>
                                    </tr>
                                    <tr>
                                        <th>Bộ nhớ trong:</th>
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
                            <h3>Bình luận sản phẩm</h3>
                            <form method="post">
                                <div className="form-group">
                                    <label>Tên:</label>
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
                                    <label>Nội dung:</label>
                                    <textarea
                                        onChange={onChangeInput}
                                        name="content"
                                        required rows={8}
                                        className="form-control"
                                        value={data.content || ""} />
                                </div>
                                <button onClick={onSubmitComments} type="submit" name="sbm" className="btn btn-primary">Gửi</button>
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