import { Fragment } from "react";
import CartService from "../../services/cart.service"
import { useNavigate } from "react-router-dom";
import TrackingListTreeService from "../../services/trackingListTree.service";

const CartItem = ({ cartItem, onRestartCart, currentUser, listTrackingListTree }) => {
    // console.log(cartItem)
    const navigate = useNavigate()

    const handleDeleteTreeItem = () => {
        CartService.updateTreeInCart(cartItem.cartItemId, cartItem.quantity - cartItem.quantity).then(
            () => {
                // console.log(response)
                onRestartCart()
            }
        )
    }

    const handleClickSeeTreeDetails = () => {
        TrackingListTreeService.getTrackingListTreeByUserId(currentUser.id).then(
            (response) => {
                listTrackingListTree = response.data
                navigate('/treeDetails', { state: { tree: cartItem.tree, currentUser, listTrackingListTree } });
            }
        )
    }

    return (
        <Fragment>
            <div
                key={cartItem.tree.treeId}
                className="itemside mb-4 d-flex justify-content-center"
            >
                <div className="aside">
                    <img
                        src={'images/' + cartItem.tree.imageUrl}
                        className="border img-sm rounded"
                        alt="Lỗi ảnh"
                        data-bs-dismiss="offcanvas"
                        onClick={handleClickSeeTreeDetails}
                    />
                </div>
                <figcaption className="info">
                    <button
                        className="btn btn-icon btn-light float-end"
                        onClick={handleDeleteTreeItem}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                    <p>{cartItem.tree.treeName}</p>
                    <span className="text-muted">{cartItem.quantity.toLocaleString('vi-VN')} x {cartItem.tree.price.toLocaleString('vi-VN')}<sup>đ</sup></span> <br />
                    <strong className="price">Tổng: {parseInt(cartItem.quantity * cartItem.tree.price).toLocaleString('vi-VN')}<sup>đ</sup></strong>
                </figcaption>
            </div>
        </Fragment>
    );
}

export default CartItem;