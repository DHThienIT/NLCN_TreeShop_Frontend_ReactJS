import { Fragment, memo, useState } from "react";
import PromotionService from "../../../services/promotion.service";
import PopupPaymentConfirmation from "../../popupComponent/PopupPaymentConfirmation";

const SummaryPayment = ({ currentUser, total, paymentMethod, currentAddress }) => {
    const [promotionCode, setPromotionCode] = useState()
    const [promotionPrice, setPromotionPrice] = useState(0)
    const [message, setMessage] = useState({
        action: '',
        message: ''
    })

    let shippingFee
    if (!paymentMethod)
        shippingFee = 0
    else shippingFee = paymentMethod.price
    let summaryPayment = total + shippingFee + parseInt(promotionPrice)

    const handleChangeVoucherCode = (e) => {
        setMessage({
            action: '',
            message: ''
        })
        setPromotionCode(e.target.value)
    }

    const timeout = () => {
        setTimeout(() => {
            setMessage({
                action: '',
                message: ''
            })
            setPromotionCode('')
        }, 5000)
    }

    const handleCheckPromotionCode = () => {
        if (promotionCode) {
            PromotionService.checkPromotionCode(promotionCode).then(
                (response) => {
                    if (response !== 0) {
                        setPromotionPrice('-' + response)
                        setMessage({
                            action: 'success',
                            message: 'Áp dụng mã ' + promotionCode + ' thành công!'
                        })
                    } else {
                        setMessage({
                            action: 'error',
                            message: 'Mã khuyến mãi không tồn tại!'
                        })
                        setPromotionPrice(0)
                    }
                    timeout()
                }
            )
        }
    }

    return (
        <Fragment>
            <div className="card px-md-3 px-2 pt-4">
                <h5 className="unregistered mb-4"> <span className="py-1">Thông tin thanh toán</span> </h5>
                <div className="d-flex flex-column b-bottom">
                    <div className="d-flex justify-content-between pb-2">
                        Tổng tiền sản phẩm
                        <p>{total.toLocaleString('vi-VN')}<sup>đ</sup></p>
                    </div>
                    <div className="d-flex justify-content-between pb-2">
                        Phí vận chuyển
                        {paymentMethod && <p>{paymentMethod.price.toLocaleString('vi-VN')}<sup>đ</sup></p>}
                    </div>
                    <div className="d-flex justify-content-between b-bottom pb-4">
                        <input
                            type="text"
                            className="ps-2"
                            value={promotionCode}
                            placeholder="nhập mã Voucher..."
                            onChange={handleChangeVoucherCode}
                            onKeyDown={e => e.code === 'Enter' ? handleChangeVoucherCode : ""}
                        />
                        <div
                            className="btn btn-primary"
                            onClick={handleCheckPromotionCode}
                        >Xác nhận</div>
                    </div>
                    {message.action === 'error' && (
                        <div className="alert alert-danger" role="alert">
                            {message.message}
                        </div>
                    )}
                    {message.action === 'success' && (
                        <div className="alert alert-success" role="alert">
                            {message.message}
                        </div>
                    )}
                    <div className="d-flex justify-content-between pb-2">
                        Tiền khuyến mãi
                        <p>{parseInt(promotionPrice).toLocaleString('vi-VN')}<sup>đ</sup></p>
                    </div>
                </div>
                <hr /><br />
                <div className="d-flex flex-column b-bottom">
                    <div className="d-flex justify-content-between pb-2">
                        <h5>Tổng tiền giỏ hàng</h5>
                        <h5 className="attention-text">{summaryPayment.toLocaleString('vi-VN')}<sup>đ</sup></h5>
                    </div>
                </div>
                <button
                    className="btn btn-my-page"
                    data-bs-toggle="modal"
                    data-bs-target="#popupPaymentConfirmation"
                >
                    Thanh Toán
                </button>
            </div>

            <PopupPaymentConfirmation currentUser={currentUser} paymentMethod={paymentMethod} summaryPayment={summaryPayment} currentAddress={currentAddress} shippingFee={shippingFee} promotionPrice={promotionPrice}/>
        </Fragment>
    );
}

export default memo(SummaryPayment);