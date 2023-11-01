import { Fragment, useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import RootService from "../../services/rootService";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setListInvoice, setListPaymentMethod, setSelectedPaymentMethodId } from "../../actions/action";

const PopupPaymentConfirmation = () => {
  const { currentUser } = useSelector(state => state.accountReducer)
  const {
    totalPayment, shippingFee, discount, listPaymentMethod,
    selectedPaymentMethodId, curentDeliveryMethod, listInvoice
  } = useSelector(state => state.orderReducer)
  const { defaultAddress } = useSelector(state => state.addressReducer)
  // console.log('111111: ', defaultAddress);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    RootService.PaymentMethodService.getAllPaymentMethod().then(
      (response) => {
        dispatch(setListPaymentMethod(response))
      }
    )
  }, [])

  const handleChangePaymentMethod = (index) => {
    dispatch(setSelectedPaymentMethodId(index))
  }

  const handleAgreePayment = () => {
    const paymentMethod = listPaymentMethod[selectedPaymentMethodId]
    RootService.InvoiceService.createInvoice(currentUser.id, defaultAddress.addressId, shippingFee, discount).then(
      (response) => {
        const invoiceInfo = response.data
        console.log(invoiceInfo.data);
        if (paymentMethod === 'NormalPayment') {
          RootService.PaymentService.pay(invoiceInfo.invoiceId, currentUser.id, 'PayDirect').then(
            (response) => {
              dispatch(setCart([]))
              dispatch(setListInvoice(response.data))
              navigate('/paymentResultNotificationSuccessPayDirect')
            }
          )
        } else if (paymentMethod === 'Vnpay') {
          RootService.PaymentService.pay(invoiceInfo.invoiceId, currentUser.id, 'VnPay').then(
            (response) => {
              window.location.href = response.data.message;
            }
          )
        } else if (paymentMethod === 'Paypal') {
          RootService.PaymentService.pay(invoiceInfo.invoiceId, currentUser.id, 'Paypal').then(
            (response) => {
              console.log(response);
              // window.location.href = response.message;
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
        <div className="modal-dialog modal-dialog-centered">
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
                {defaultAddress.name && (
                  <>
                    <div className="d-flex justify-content-between pb-3">
                      <div><b>Tên người nhận: </b><b className="text-page">{defaultAddress.name}</b></div>
                      <div><b>Số điện thoại: </b><b className="text-page">{defaultAddress.phone}</b></div>
                    </div>
                    <div className="d-flex justify-content-between pb-3">
                      <div><b>Địa chỉ: </b><b className="text-page">{defaultAddress.specificAddress + ', ' + defaultAddress.ward.name + ', ' + defaultAddress.countryAndDistrict.name + ', ' + defaultAddress.provinceAndCity.name}</b></div>
                    </div>
                    <br />
                    <div className="d-flex justify-content-between pb-3">
                      <div><b>Hình thức vận chuyển: </b><b className="text-page">{curentDeliveryMethod.details}</b></div>
                    </div>
                    <div className="d-flex justify-content-between pb-3">
                      <div><b>Thời gian dự kiến đến nơi: </b><b className="text-page">{curentDeliveryMethod.estimatedTime}</b></div>
                    </div>
                  </>
                )}
                <br /><hr /><br />
                <div className="d-flex justify-content-between">
                  <b>Hình thức thanh toán:</b>
                  <select
                    className="btn btn-light"
                    value={selectedPaymentMethodId}
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
                  <h5 className="attention-text">{totalPayment.toLocaleString('vi-VN')}<sup>đ</sup></h5>
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

export default memo(PopupPaymentConfirmation);