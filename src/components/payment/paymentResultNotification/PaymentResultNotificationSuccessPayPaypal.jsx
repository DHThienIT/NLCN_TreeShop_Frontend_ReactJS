import { Fragment} from "react";
import { useNavigate } from "react-router-dom";

const PaymentResultNotificationSuccessPayPaypal = () => {
    const navigate = useNavigate()
    return (
        <Fragment>
            <br />
            <div className="payment-notification">
                <div className="body">
                    <div className="title">
                        Thanh Toán Thành Công
                    </div>
                    <img className="pic2" src="https://res.cloudinary.com/dw1zug8d6/image/upload/v1542777688/group-3_3x.png" alt=''/>
                    <h5>Bạn đã thanh toán thành công!</h5>
                    <br />
                    <b>Đơn hàng sẽ đến tay trong vài ngày nữa!</b>
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

export default PaymentResultNotificationSuccessPayPaypal;