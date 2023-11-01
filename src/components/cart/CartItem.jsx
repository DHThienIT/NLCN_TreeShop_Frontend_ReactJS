import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RootService from "../../services/rootService";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setOneTreeInfo } from "../../actions/action";

const CartItem = ({ cartItem }) => {
    const { currentUser } = useSelector(state => state.accountReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image, setImage] = useState();

    useEffect(() => {
        // console.log('Thực hiện check')
        RootService.ImageService.getTreeImage(cartItem.tree.treeId).then(
            (response) => {
                setImage(response)
            }
        )
    }, [])

    const handleDeleteTreeItem = () => {
        RootService.CartService.updateTreeInCart(currentUser.id, cartItem.cartItemId, cartItem.quantity - cartItem.quantity).then(
            (response) => {
                // console.log(response)
                dispatch(setCart(response.data))
            }
        )
    }

    const handleClickSeeTreeDetails = () => {
        dispatch(setOneTreeInfo(cartItem.tree))
        navigate('/treeDetails');
    }

    return (
        <Fragment>
            <div
                key={cartItem.tree.treeId}
                className="itemside mb-4 d-flex justify-content-center"
            >
                <div className="aside">
                    <img
                        src={image}
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
                    <p style={{color: '#05662C'}}>{cartItem.tree.treeName}</p>
                    <b>{cartItem.quantity}</b><span className="text-muted"> x {cartItem.tree.price.toLocaleString('vi-VN')}<sup>đ</sup></span> <br />
                    <strong className="price">Tổng: {parseInt(cartItem.quantity * cartItem.tree.price).toLocaleString('vi-VN')}<sup>đ</sup></strong>
                </figcaption>
            </div>
        </Fragment>
    );
}

export default CartItem;