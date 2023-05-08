import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentMethodService from "../../services/paymentMethod.service";
import InvoiceService from "../../services/invoice.service";
import PaymentService from "../../services/payment.service";

const PopupPaymentConfirmation = ({ currentUser, summaryPayment, paymentMethod, currentAddress, shippingFee, promotionPrice }) => {
  console.log('1x1xx1: ', currentUser, summaryPayment, paymentMethod, currentAddress, shippingFee, promotionPrice)
  const navigate = useNavigate()
  if (!summaryPayment) summaryPayment = 0
  const [listPaymentMethod, setListPaymentMethod] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    PaymentMethodService.getAllPaymentMethod().then(
      (response) => {
        // console.log('response', response)
        setListPaymentMethod(response)
      }
    )
  }, [])

  const handleChangePaymentMethod = (index) => {
    setSelectedOption(index)
  }

  const handleAgreePayment = () => {
    const paymentMethod = listPaymentMethod[selectedOption]

    InvoiceService.createInvoice(currentUser.id, currentAddress.addressId, shippingFee, promotionPrice).then(
      (response) => {
        const invoiceInfo = response
        if (paymentMethod === 'NormalPayment') {
          PaymentService.pay(invoiceInfo.invoiceId, currentUser.id, 'PayDirect').then(
            () => {
              navigate('/paymentResultNotificationSuccessPayDirect')
            }
          )
        } else if (paymentMethod === 'Vnpay') {
          PaymentService.pay(invoiceInfo.invoiceId, currentUser.id, 'VnPay').then(
            (response) => {
              window.location.href = response.message;
            }
          )
        } else if (paymentMethod === 'Paypal') {
          PaymentService.pay(invoiceInfo.invoiceId, currentUser.id, 'Paypal').then(
            (response) => {
              window.location.href = response.message;
            }
          )
        }
      }
    )
  }

  return (
    <Fragment>
      <div
        className="modal fade"
        id="popupPaymentConfirmation"
        tabIndex="-1"
        aria-labelledby="popupFormLabel"
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="popupFormLabel">
                Xác nhận thanh toán
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="px-md-3 px-2 pt-4">
              <div className="d-flex flex-column b-bottom">
                {currentAddress && paymentMethod && (
                  <>
                    <div className="d-flex justify-content-between pb-3">
                      <div><b>Tên người nhận: </b><b className="text-page">{currentAddress.name}</b></div>
                      <div><b>Số điện thoại: </b><b className="text-page">{currentAddress.phone}</b></div>
                    </div>
                    <div className="d-flex justify-content-between pb-3">
                      <div><b>Địa chỉ: </b><b className="text-page">{currentAddress.specificAddress + ', ' + currentAddress.ward.name + ', ' + currentAddress.countryAndDistrict.name + ', ' + currentAddress.provinceAndCity.name}</b></div>
                    </div>
                    <br />
                    <div className="d-flex justify-content-between pb-3">
                      <div><b>Hình thức vận chuyển: </b><b className="text-page">{paymentMethod.details}</b></div>
                    </div>
                    <div className="d-flex justify-content-between pb-3">
                      <div><b>Thời gian dự kiến đến nơi: </b><b className="text-page">{paymentMethod.estimatedTime}</b></div>
                    </div>
                  </>
                )}
                <br /><hr /><br />
                <div className="d-flex justify-content-between">
                  <b>Hình thức thanh toán:</b>
                  <select
                    className="btn btn-light"
                    value={selectedOption}
                    onChange={(e) => handleChangePaymentMethod(e.target.value)}
                  >
                    {
                      listPaymentMethod.map((paymentMethod, index) => {
                        return (
                          <option
                            key={index}
                            value={index}
                          >
                            <b>{paymentMethod === 'NormalPayment' ? 'Thanh toán trực tiếp' : paymentMethod}</b>
                          </option>
                        )
                      })
                    }
                  </select>
                </div>
                <br />
                <div className="d-flex justify-content-between pb-3">
                  <b>Tổng tiền đơn hàng</b>
                  <h5 className="attention-text">{summaryPayment.toLocaleString('vi-VN')}<sup>đ</sup></h5>
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                className="btn btn-my-page"
                data-bs-dismiss="modal"
                style={{ width: "15rem" }}
                onClick={handleAgreePayment}
              >
                Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </div >
    </Fragment >
  );
}

export default PopupPaymentConfirmation;