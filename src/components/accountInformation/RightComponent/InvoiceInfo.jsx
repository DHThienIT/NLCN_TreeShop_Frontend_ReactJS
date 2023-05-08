import { Fragment, useState, useEffect } from "react";
import InvoiceService from "../../../services/invoice.service";
import { useNavigate } from "react-router-dom";

const InvoiceInfo = ({ currentUser }) => {
  const navigate = useNavigate()
  const [listInvoice, setListInvoice] = useState([]);
  // const [listItem, setListItem] = useState([]);

  useEffect(() => {
    InvoiceService.getAllInvoicesPaySuccessByUser(currentUser.id).then(
      (response) => {
        console.log(response)
        setListInvoice(response)
      }
    )
  }, [currentUser]);

  return (
    <Fragment>
      <div className="col-md-9 border-right">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Thông tin các đơn hàng ({listInvoice.length})</h4>
          </div>
          <hr />

          {listInvoice.map((invoice) => {
            console.log(invoice)
            return (
              <>
                <div
                  key={invoice.invoiceId}
                  className="row mt-4"
                  style={{ background: "rgb(234 255 247)", border: "2px solid #333" }}

                  data-bs-toggle="collapse"
                  data-bs-target={'#collapse' + invoice.invoiceId}
                  aria-expanded="false"
                >
                  <div className="row" style={{ margin: "0.5rem" }}>
                    <div className="d-flex justify-content-between">
                      {(invoice.paymentMethod && (
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

                      {(invoice.paymentMethod && (
                        <div>
                          <b className="text-page">Thời gian thanh toán:</b>
                          <br />
                          {invoice.timeCreate}
                        </div>
                      )) || (
                          <div>
                            <div
                              className="btn btn-danger"
                              style={{ marginBottom: "0.5rem" }}
                              onClick={() => navigate('/payment', { state: { currentUser, listCart: invoice.cartItems } })}
                            >
                              <i className="fa-sharp fa-solid fa-receipt"></i>{' '}
                              <span>Mua lại</span>
                            </div>
                            <br />
                          </div>
                        )}
                    </div>
                    <hr />

                    <div className="collapse card2" id={'collapse' + invoice.invoiceId}>
                      {invoice.cartItems.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="row mt-1"
                        >
                          <div className="row d-flex align-items-center">
                            <div className="col-md-11">
                              <br />
                              <div className="row">
                                {/* <div className="col-md-3"> */}
                                <img
                                  className="invoice-pic"
                                  src={'/images/' + item.tree.imageUrl}
                                  alt=""
                                />
                                {/* </div> */}
                                <div className="col-md-9">
                                  <h5 className="text-page">{item.tree.treeName}</h5>
                                  Loại: {item.tree.size}<br />
                                  Nguồn: {item.tree.supplier.supplierName}<br />
                                  x{item.quantity}
                                </div>
                              </div>
                              <br />
                            </div>
                            <div className="col-md-1">
                              <p className="text-page">{parseInt(item.tree.price * item.quantity).toLocaleString('vi-VN')}<sup>đ</sup></p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}
                    </div>

                    <div
                      className="row"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <b className="text-page">Người nhận:</b> {invoice.address.name}
                          <br />
                          <b className="text-page">Số điện thoại:</b> {invoice.address.phone}
                          <br />
                          <b className="text-page">Đến địa chỉ:</b> {invoice.address.specificAddress + ', ' + invoice.address.ward.name + ', ' + invoice.address.countryAndDistrict.name + ', ' + invoice.address.provinceAndCity.name}
                          <br />
                          {invoice.paymentMethod && (
                            <>
                              <b className="text-page">
                                Phương thức thanh toán:
                              </b>
                              {(invoice.paymentMethod === 'PayDirect' && ' Thanh toán trực tiếp') || (' ' + invoice.paymentMethod)}
                            </>
                          )}
                        </div>
                        <div>
                          <b>Phí vận chuyển: {invoice.shipmentFee.toLocaleString('vi-VN')}<sup>đ</sup></b>
                          <br />
                          <b>Tiền khuyến mãi: {(invoice.paymentMethod && invoice.promotionPrice.toLocaleString('vi-VN')) || 0}<sup>đ</sup></b>
                          <br />
                          <h5 className="attention-text">Thành tiền: {invoice.totalPrice.toLocaleString('vi-VN')}<sup>đ</sup></h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            )
          })}
        </div >

        {
          listInvoice.length === 0 && (
            <div className="d-flex align-items-center flex-column">
              <img src="https://cdn4.iconfinder.com/data/icons/top-search-6/128/_Dollar_sign_list_paper_receipt_shopping_shopping_list_-256.png" style={{ width: "8rem", opacity: "0.5" }} alt="" />
              <br />
              <span>Hiện bạn chưa có đơn hàng nào đã đặt.</span>
            </div>
          )
        }
      </div>

    </Fragment >
  );
}

export default InvoiceInfo;