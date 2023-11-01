import { Fragment, memo, useEffect, useState } from "react";
import RootService from "../../../services/rootService";
import PopupPaymentConfirmation from "../../popupComponent/PopupPaymentConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPayment, setDiscount, setDiscountCode } from "../../../actions/action";

const SummaryPayment = () => {
    const { totalPayment, shippingFee, discountCode, discount } = useSelector(state => state.orderReducer)
    const { totalCartAmount } = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    const [message, setMessage] = useState({
        action: '',
        message: ''
    })

    useEffect(() => {
        dispatch(setTotalPayment(totalCartAmount + shippingFee + parseInt(discount)))
    }, [totalCartAmount, shippingFee, discount])

    const handleChangeVoucherCode = (e) => {
        setMessage({
            action: '',
            message: ''
        })
        dispatch(setDiscountCode(e.target.value))
    }

    const timeout = () => {
        setTimeout(() => {
            setMessage({
                action: '',
                message: ''
            })
            dispatch(setDiscountCode(''))
        }, 5000)
    }

    const handleCheckPromotionCode = () => {
        if (discountCode) {
            RootService.PromotionService.checkPromotionCode(discountCode).then(
                (response) => {
                    if (response !== 0) {
                        dispatch(setDiscount('-' + response))
                        setMessage({
                            action: 'success',
                            message: 'Áp dụng mã ' + discountCode + ' thành công!'
                        })
                        dispatch(setDiscount(-response))
                    } else {
                        setMessage({
                            action: 'error',
                            message: 'Mã khuyến mãi không tồn tại!'
                        })
                        dispatch(setDiscount(0))
                    }
                    timeout()
                }
            )
        } else {
            setMessage({
                action: 'error',
                message: 'Chưa nhập mã khuyến mãi!'
            })
            dispatch(setDiscount(0))
            timeout()
        }
    }

    return (
        <Fragment>
            <div className="card px-md-3 px-2 pt-4">
                <h5 className="unregistered mb-4"> <span className="py-1">Thông tin thanh toán</span> </h5>
                <div className="d-flex flex-column b-bottom">
                    <div className="d-flex justify-content-between pb-2">
                        Tổng tiền sản phẩm
                        <p>{totalCartAmount.toLocaleString('vi-VN')}<sup>đ</sup></p>
                    </div>
                    <div className="d-flex justify-content-between pb-2">
                        Phí vận chuyển
                        <p>{shippingFee.toLocaleString('vi-VN')}<sup>đ</sup></p>
                    </div>
                    <div className="d-flex justify-content-between b-bottom pb-4">
                        <input
                            type="text"
                            className="ps-2"
                            value={discountCode}
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
                        <p>{parseInt(discount).toLocaleString('vi-VN')}<sup>đ</sup></p>
                    </div>
                </div>
                <hr /><br />
                <div className="d-flex flex-column b-bottom">
                    <div className="d-flex justify-content-between pb-2">
                        <h5>Tổng tiền giỏ hàng</h5>
                        <h5 className="attention-text">{totalPayment.toLocaleString('vi-VN')}<sup>đ</sup></h5>
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

            <PopupPaymentConfirmation />
        </Fragment>
    );
}

export default memo(SummaryPayment);