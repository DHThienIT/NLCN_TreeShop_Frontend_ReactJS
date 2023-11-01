import { Fragment, useState, memo } from "react";
import PaymentItem from "./paymentChild/PaymentItem";
import ShipmentDetails from "./paymentChild/ShipmentDetails";
import SummaryPayment from "./paymentChild/SummaryPayment";
import { useSelector } from "react-redux";

const PaymentArea = () => {
    const { cart } = useSelector(state => state.cartReducer)
    let foundCartItem = []

    cart.forEach((paymentItem) => {
        foundCartItem.push(
            <PaymentItem
                key={paymentItem.tree.treeId}
                paymentItem={paymentItem}
            />
        );
    })

    return (
        <Fragment>
            <div className="container mt-4 p-0">
                <div className="row px-md-4 px-2 pt-4">
                    <div className="col-lg-8">
                        <div className="card">
                            <h5 className="ribbon ribbon-top-right"><span>Các sản phẩm trong giỏ hàng</span></h5>
                            <div>
                                <div className="table-responsive px-md-4 px-2 pt-3">
                                    {foundCartItem}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <ShipmentDetails />
                        <SummaryPayment />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default memo(PaymentArea);