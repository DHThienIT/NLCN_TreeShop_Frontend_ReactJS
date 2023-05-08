import { Fragment, useEffect, useState } from "react";
import CartService from "../../../services/cart.service"
import { useNavigate } from 'react-router-dom';
import TrackingListTreeService from "../../../services/trackingListTree.service";

const TreeItem = ({ tree, listTrackingListTree, currentUser, warningAddFavorite, warningAddTreeToCart, successAddTreeToCart, handleRestartTrackingList }) => {
    // console.log('listTrackingListTree: ', listTrackingListTree)
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        // console.log('Thực hiện check')
        listTrackingListTree.map(check => {
            if (check.treeId === tree.treeId) {
                setChecked(true)
            }
        })
    }, [listTrackingListTree, tree])

    const handleAddToCart = () => {
        if (!currentUser)
            warningAddTreeToCart(tree.treeName)
        else
            CartService.addTreeToCart(tree.treeId, currentUser.id, 1).then(
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
            TrackingListTreeService.updateTreeInTrackingList(currentUser.id, tree.treeId).then(
                (response) => {
                    // console.log('checked', checked)
                    handleRestartTrackingList()
                    setChecked(false)
                }
            )
        }
    }

    const handleClickSeeTreeDetails = () => {
        navigate('/treeDetails', { state: { tree, currentUser, listTrackingListTree } });
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
                            className="img-fluid"
                            src={'/images/' + tree.imageUrl}
                            alt="Ảnh sản phẩm"
                            onClick={handleClickSeeTreeDetails}
                        />
                    </div>

                    <figcaption className="info-wrap border-top">
                        <div className="tree-title">{tree.treeName}</div>
                        <div className="price-wrap">
                            <del className="price-old">$170.00</del>
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
                                <i className="fa fa-heart" style={checked ? { color: "#da0da0" } : {}}></i>
                            </button>
                        </div>
                    </figcaption>
                </figure>
            </div >
        </Fragment>
    )
}

export default TreeItem;