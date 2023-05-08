import { Fragment, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import PaymentItem from "./paymentChild/PaymentItem";
import CartService from "../../services/cart.service";
import ShipmentDetails from "./paymentChild/ShipmentDetails";
import SummaryPayment from "./paymentChild/SummaryPayment";

const PaymentArea = () => {
    let foundCartItem = []
    let total = 0
    const location = useLocation();
    let { currentUser, listCart } = location.state || {}
    const [listCart1, setListCart1] = useState(listCart)
    const [paymentMethod, setPaymentMethod] = useState()
    const [currentAddress, setCurrentAddress] = useState();
    const handleRestartCart = () => {
        CartService.listCartItem(currentUser.id).then(
            (response) => {
                setListCart1(response.data)
            }
        )
    }

    const handleOnChangeQuality = (cartItemId, prevQuality, numTreesInStock, action, num) => {
        // console.log('number', prevQuality, numTreesInStock, action, num)
        let quantity
        if (action === 'add' || action === 'sub') {
            quantity = prevQuality + num
            if (quantity === 0) quantity = 1
        } else if (action === 'update') {
            if (!num) quantity = 1
            else quantity = num
        } else if (action === 'delete') {
            quantity = num
        }
        console.log('quantity', quantity)
        if (quantity <= numTreesInStock) {
            CartService.updateTreeInCart(cartItemId, quantity).then(
                () => {
                    handleRestartCart()
                }
            )
        }
    }

    const handleSetCurrentAddress = (address) => {
        setCurrentAddress(address)
    }

    const handleSetPaymentMethod = (paymentMethod) => {
        setPaymentMethod(paymentMethod)
    }

    listCart1.forEach((paymentItem) => {
        total = total + (paymentItem.tree.price * paymentItem.quantity)
        foundCartItem.push(
            <PaymentItem
                key={paymentItem.tree.treeId}
                currentUser={currentUser}
                paymentItem={paymentItem}
                addressId={paymentItem.tree.supplier.address_id}
                handleOnChangeQuality={handleOnChangeQuality}
            />
        );
    })
    // console.log('11111111111111111', paymentMethod)

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
                        <ShipmentDetails currentUser={currentUser} paymentMethod={paymentMethod} onSetCurrentAddress={handleSetCurrentAddress} onSetPaymentMethod={handleSetPaymentMethod} />
                        <SummaryPayment currentUser={currentUser} total={total} paymentMethod={paymentMethod} currentAddress={currentAddress} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default memo(PaymentArea);