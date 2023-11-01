import { Fragment, useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RootService from "../../../services/rootService";
import { setOneTreeInfo } from "../../../actions/action";

const TreeItemInInvoiceInfo = ({ treeItemInfo }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image, setImage] = useState();
    console.log((treeItemInfo));
    useEffect(() => {
        RootService.ImageService.getTreeImage(treeItemInfo.tree.treeId).then(
            (response) => {
                setImage(response)
            }
        )
    }, [])

    const handleClickSeeTreeDetails = () => {
        dispatch(setOneTreeInfo(treeItemInfo.tree))
        navigate('/treeDetails');
    }

    return (
        <Fragment>
            <div
                key={treeItemInfo.cartItemId}
                className="row mt-1"
            >
                <div className="row d-flex align-items-center">
                    <div className="col-md-10">
                        <br />
                        <div className="row">
                            <img
                                className="invoice-pic"
                                src={image}
                                alt=""
                            />
                            <div className="col-md-9">
                                <h5 className="text-page">{treeItemInfo.tree.treeName}</h5>
                                Loại: {treeItemInfo.tree.size}<br />
                                Nguồn: {treeItemInfo.tree.supplier.supplierName}<br />
                                x{treeItemInfo.quantity}
                            </div>
                        </div>
                        <br />
                    </div>
                    <div className="col-md-2">
                        <p className="text-page">{parseInt(treeItemInfo.tree.price * treeItemInfo.quantity).toLocaleString('vi-VN')}<sup>đ</sup></p>
                        <button className="btn btn-primary" onClick={handleClickSeeTreeDetails}>
                            <span>Mua lại</span>
                        </button>
                    </div>
                </div>
                <hr />
            </div>
        </Fragment >
    );
}

export default memo(TreeItemInInvoiceInfo);