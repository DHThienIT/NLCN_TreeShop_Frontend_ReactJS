import { Fragment, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import RootService from "../../services/rootService";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setTotalCartAmount } from "../../actions/action";

const CartArea = () => {
    const { currentUser } = useSelector(state => state.accountReducer)
    const { cart, totalCartAmount } = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const foundCartItem = []

    useEffect(() => {
        let total = 0
        cart.forEach((cartItem) => {
            total = total + (cartItem.tree.price * cartItem.quantity)
        })
        dispatch(setTotalCartAmount(total))
    }, [cart])

    cart.forEach((cartItem) => {
        foundCartItem.push(
            <CartItem
                key={cartItem.tree.treeId}
                cartItem={cartItem}
            />
        );
    })

    return (
        <Fragment>
            {currentUser ? (
                <aside className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvas_cart">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Giỏ hàng ({foundCartItem.length}) </h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        {foundCartItem}
                        {
                            (foundCartItem.length === 0 && (
                                <div className="d-flex flex-column align-items-center">
                                    <img src="https://cdn2.iconfinder.com/data/icons/finance_icons/PNG/png256/shopping%20cart.png" style={{ width: "6rem", opacity: "0.7" }} />
                                    <h5 className="mb-3"><strong className="text-danger">Giỏ hàng hiện đang trống!</strong></h5>
                                    <div className="mb-3">
                                        <button
                                            className="btn w-100 btn-success"
                                            data-bs-dismiss="offcanvas"
                                            onClick={() => navigate('/data')}
                                        > Thêm sản phẩm vào giỏ </button>
                                    </div>
                                </div>
                            )) || (
                                <Fragment>
                                    <p className="mb-3 text-center"> Tổng tiền giỏ hàng:  <strong className="text-danger">
                                        {totalCartAmount.toLocaleString('vi-VN')}<sup>đ</sup>
                                    </strong>  </p>
                                    <div className="mb-3">
                                        <button
                                            className="btn w-100 btn-my-page"
                                            data-bs-dismiss="offcanvas"
                                            onClick={() => navigate('/payment')}
                                        > Thanh Toán </button>
                                    </div>
                                </Fragment>
                            )
                        }
                        <p className="mb-3 text-center"> <img src="../assets/images/payments.webp" alt="123" height="22" /></p>
                    </div>
                </aside>
            ) : (
                <aside className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvas_cart">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Giỏ hàng</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <p className="mb-3 text-center">Hãy đăng nhập để sử dụng chức năng này!</p>
                        <div className="mb-3">
                            <button
                                className="btn w-100 btn-success"
                                data-bs-dismiss="offcanvas"
                                onClick={() => {
                                    navigate('/login')
                                }}
                            >
                                Đăng Nhập
                            </button>
                        </div>
                    </div>
                </aside>
            )}
        </Fragment>
    );
}

export default CartArea;