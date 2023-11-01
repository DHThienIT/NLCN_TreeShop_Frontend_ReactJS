import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const PaymentResultNotificationError = () => {
    const navigate = useNavigate()

    return (
        <Fragment>
            <br />
            <div className="payment-notification">
                <div className="body">
                    <div className="title">
                        Thanh Toán Thất Bại
                    </div>
                    <img className="pic" src='../icons/error_icon.svg' alt=''/>
                    <h5>Giao dịch không thành công!</h5>
                    <br />
                    <b>Đã có lỗi xãy ra, xin vui lòng thử lại.</b>
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

export default PaymentResultNotificationError;