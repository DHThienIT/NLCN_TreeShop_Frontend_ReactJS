import { Fragment, useState, useEffect } from "react";
import RootService from "../../../services/rootService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import InvoiceInfoItem from "./InvoiceInfoItem";
import { setListInvoice } from "../../../actions/action";

const InvoiceInfo = () => {
  const { listInvoice } = useSelector(state => state.orderReducer)
  const dispatch = useDispatch()
  let foundInvoiceItem = []

  listInvoice.forEach((invoiceItem) => {
    foundInvoiceItem.push(
      <InvoiceInfoItem key={invoiceItem.invoiceId} invoiceItem={invoiceItem} />
    )
  })

  return (
    <Fragment>
      <div className="col-md-9 border-right">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Thông tin các đơn hàng ({listInvoice.length})</h4>
          </div>
          <hr />
          {foundInvoiceItem}
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