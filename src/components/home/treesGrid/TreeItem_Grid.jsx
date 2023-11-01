import { Fragment, useEffect, useState, memo } from "react";
import { useNavigate } from 'react-router-dom';
import RootService from "../../../services/rootService"
import { useDispatch } from 'react-redux';
import { restartTrackingListTree, setCart, setOneTreeInfo } from "../../../actions/action";
import { useSelector } from 'react-redux';

const TreeItem_Grid = ({ tree, isFavoriteTree, warningAddFavorite, warningAddTreeToCart, successAddTreeToCart }) => {
    let { currentUser } = useSelector(state => state.accountReducer)
    const { cart } = useSelector(state => state.cartReducer)
    const navigate = useNavigate()
    const [image, setImage] = useState();

    const dispatch = useDispatch()

    useEffect(() => {
        RootService.ImageService.getTreeImage(tree.treeId).then(
            (response) => {
                // console.log(response)
                setImage(response)
            }
        )
    }, [tree])

    const handleAddToCart = () => {
        console.log(cart)
        if (!currentUser)
            warningAddTreeToCart(tree.treeName)
        // let list = [...cart, 123]
        else RootService.CartService.addTreeToCart(tree.treeId, currentUser.id, 1).then(
            (response) => {
                successAddTreeToCart(tree.treeName)
                dispatch(setCart(response))
            }
        )
    }

    const handleAddFavorite = () => {
        if (!currentUser)
            warningAddFavorite(tree.treeName)
        else {
            dispatch(restartTrackingListTree(currentUser.id, tree.treeId))
        }
    }

    const handleClickSeeTreeDetails = () => {
        dispatch(setOneTreeInfo(tree))
        navigate('/treeDetails');
    }

    return (
        <Fragment>
            <div className="col-lg-4 col-md-6 col-sm-6">
                <figure
                    className="card card-product-grid"
                >
                    <div className="img-wrap">
                        <img
                            style={{ height: "fit-content" }}
                            // className="img-fluid"
                            src={image}
                            alt="Ảnh sản phẩm"
                            onClick={handleClickSeeTreeDetails}
                        />
                    </div>

                    <figcaption className="info-wrap border-top">
                        <div className="tree-title">{tree.treeName}</div>
                        <div className="price-wrap">
                            <del className="price-old">{(tree.price - 3000).toLocaleString('vi-VN')}<sup>₫</sup></del>
                            <strong className="price"> {tree.price.toLocaleString('vi-VN')}<sup>₫</sup></strong>
                        </div>

                        {/* <p className="title mb-2">Mô tả: {tree.description}</p> */}
                        <div className="d-flex justify-content-around">
                            <button
                                className={`btn btn-follow btn-icon`}
                                onClick={handleClickSeeTreeDetails}
                            >
                                <i className="fa-sharp fa-solid fa-circle-info"></i>
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddToCart}
                            >
                                <i className="fa-solid fa-cart-plus"></i>
                                {' '}Thêm
                            </button>
                            <button
                                className={`btn btn-follow btn-icon`}
                                onClick={handleAddFavorite}
                            >
                                <i className="fa fa-heart" style={isFavoriteTree ? { color: "#da0da0" } : {}}></i>
                            </button>
                        </div>
                    </figcaption>
                </figure>
            </div >
        </Fragment>
    )
}

export default memo(TreeItem_Grid);