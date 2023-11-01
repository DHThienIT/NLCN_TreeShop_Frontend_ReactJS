import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RootService from "../../../services/rootService";
import TreeItemInInvoiceInfo from "./TreeItemInInvoiceInfo";

const InvoiceInfoItem = ({ invoiceItem }) => {
  const { currentUser } = useSelector(state => state.accountReducer)
  const navigate = useNavigate()

  return (
    <Fragment>
      <div
        key={invoiceItem.invoiceId}
        className="row mt-4"
        style={{ background: "rgb(234 255 247)", border: "2px solid #333" }}
        data-bs-toggle="collapse"
        data-bs-target={'#collapse' + invoiceItem.invoiceId}
        aria-expanded="false"
      >
        <div className="row" style={{ margin: "0.5rem" }}>
          <div className="d-flex justify-content-between">
            {(invoiceItem.paymentMethod && (
              <div>
                <div className="btn btn-success">
                  <i className="fa-sharp fa-solid fa-receipt"></i>{' '}
                  <span>Đã thanh toán</span>
                </div>
              </div>
            )) || (
                <div>
                  <div className="btn btn-secondary">
                    <i className="fa-sharp fa-solid fa-receipt"></i>{' '}
                    <span>Chưa thanh toán</span>
                  </div>
                </div>
              )}

            {(invoiceItem.paymentMethod && (
              <div>
                <b className="text-page">Thời gian thanh toán:</b>
                <br />
                {invoiceItem.timeCreate}
              </div>
            )) || (
                <div>
                  <div
                    className="btn btn-danger"
                    style={{ marginBottom: "0.5rem" }}
                    onClick={() => navigate('/payment', { state: { currentUser, listCart: invoiceItem.cartItems } })}
                  >
                    <i className="fa-sharp fa-solid fa-receipt"></i>{' '}
                    <span>Mua lại</span>
                  </div>
                  <br />
                </div>
              )}
          </div>
          <hr />

          <div className="collapse card2" id={'collapse' + invoiceItem.invoiceId}>
            {invoiceItem.cartItems.map((item) => (<TreeItemInInvoiceInfo treeItemInfo={item} />))}
          </div>

          <div
            className="row"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <b className="text-page">Người nhận:</b> {invoiceItem.address.name}
                <br />
                <b className="text-page">Số điện thoại:</b> {invoiceItem.address.phone}
                <br />
                <b className="text-page">Đến địa chỉ:</b> {invoiceItem.address.specificAddress + ', ' + invoiceItem.address.ward.name + ', ' + invoiceItem.address.countryAndDistrict.name + ', ' + invoiceItem.address.provinceAndCity.name}
                <br />
                {invoiceItem.paymentMethod && (
                  <>
                    <b className="text-page">
                      Phương thức thanh toán:
                    </b>
                    {(invoiceItem.paymentMethod === 'PayDirect' && ' Thanh toán trực tiếp') || (' ' + invoiceItem.paymentMethod)}
                  </>
                )}
              </div>
              <div>
                <b>Phí vận chuyển: {invoiceItem.shipmentFee.toLocaleString('vi-VN')}<sup>đ</sup></b>
                <br />
                <b>Tiền khuyến mãi: {(invoiceItem.paymentMethod && invoiceItem.promotionPrice.toLocaleString('vi-VN')) || 0}<sup>đ</sup></b>
                <br />
                <h5 className="attention-text">Thành tiền: {invoiceItem.totalPrice.toLocaleString('vi-VN')}<sup>đ</sup></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </Fragment >
  );
}

export default InvoiceInfoItem;