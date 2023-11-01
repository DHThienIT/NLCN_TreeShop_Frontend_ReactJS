import { Fragment, useEffect, useState, memo } from "react";
import { useNavigate } from 'react-router-dom';
import RootService from "../../../services/rootService"
import { useDispatch } from 'react-redux';
import { restartTrackingListTree, setOneTreeInfo } from "../../../actions/action";
import { useSelector } from 'react-redux';

const TreeItem_List = ({ tree, isFavoriteTree, warningAddFavorite, warningAddTreeToCart, successAddTreeToCart }) => {
    let { currentUser } = useSelector(state => state.accountReducer)
    const navigate = useNavigate()
    const [image, setImage] = useState();
    const [showMore, setShowMore] = useState(false);

    const dispatch = useDispatch()
    
    useEffect(() => {
        RootService.ImageService.getTreeImage(tree.treeId).then(
            (response) => {
                setImage(response)
            }
        )
        if (tree.description.length < 180) setShowMore(true)
    }, [tree])

    const handleAddToCart = () => {
        if (!currentUser)
            warningAddTreeToCart(tree.treeName)
        else
            RootService.CartService.addTreeToCart(tree.treeId, currentUser.id, 1).then(
                () => {
                    // console.log(response.data)
                    successAddTreeToCart(tree.treeName)
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
            {/* <div className="row-lg-4 row-md-6 row-sm-6"> */}
            <figure
                className="card card-product-list"
            >
                <div className="img-wrap" style={{ flex: 1 }}>
                    <img
                        // style={{ height: "fit-content" }}
                        // className="img-fluid"
                        src={image}
                        alt="Ảnh sản phẩm"
                        onClick={handleClickSeeTreeDetails}
                    />
                </div>

                <figcaption className="info-wrap border-top" style={{ flex: 3 }}>
                    <div className="d-flex flex-direction-row justify-content-between">
                        <div className="tree-title">{tree.treeName}</div>
                        <div className="supplier-name ">{tree.supplier.supplierName}</div>
                    </div>
                    <div className="price-wrap">
                        <del className="price-old">{(tree.price - 3000).toLocaleString('vi-VN')}<sup>₫</sup></del>
                        <strong className="price"> {tree.price.toLocaleString('vi-VN')}<sup>₫</sup></strong>
                    </div>
                    <div className="description" style={!showMore ? { maxHeight: "3rem" } : {}}>{tree.description}</div>
                    {!showMore ? (
                        <div
                            className="show-more"
                            onClick={() => { setShowMore(true) }}
                        >
                            <b>{'Đọc thêm...'}</b>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="d-flex justify-content-center" style={{ paddingTop: '1rem' }}>
                        <button
                            className={`btn btn-follow btn-icon-2`}
                            onClick={handleClickSeeTreeDetails}
                        >
                            <i className="fa-sharp fa-solid fa-circle-info"></i> Chi tiết
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                        >
                            <i className="fa-solid fa-cart-plus"></i>
                            {' '}Thêm
                        </button>
                        <button
                            className={`btn btn-follow btn-icon-2`}
                            onClick={handleAddFavorite}
                        >
                            <div style={isFavoriteTree ? { color: "#da0da0" } : {}}>
                                <i className="fa fa-heart" ></i> Yêu thích
                            </div> 
                        </button>
                    </div>
                </figcaption>
            </figure>
            {/* </div > */}
        </Fragment>
    )
}

export default memo(TreeItem_List);