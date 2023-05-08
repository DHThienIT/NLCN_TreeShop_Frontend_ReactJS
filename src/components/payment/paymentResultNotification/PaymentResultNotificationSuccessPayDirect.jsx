import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const PaymentResultNotificationSuccessPayDirect = () => {
    const navigate = useNavigate()
    return (
        <Fragment>
            <br />
            <div className="payment-notification">
                <div className="body">
                    <div className="title">
                        Thanh Toán Thành Công
                    </div>
                    <img className="pic" src='../icons/direct-payment.png' alt='' />
                    <h5>Đơn hàng của bạn <br />đã được đặt thành công!</h5>
                    <br />
                    <b>Xin vui lòng trả phí khi người giao hàng đến.</b>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/data')}
                    >
                        Đồng Ý
                    </button>
                </div>
            </div>
            <br />
        </Fragment>
    );
}

export default PaymentResultNotificationSuccessPayDirect;