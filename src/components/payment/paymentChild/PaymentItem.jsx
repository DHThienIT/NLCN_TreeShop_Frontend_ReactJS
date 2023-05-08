import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressService from "../../../services/address.service";
import TrackingListTreeService from "../../../services/trackingListTree.service";
import PopupAgreeOrDegree from "../../popupComponent/PopupAgreeOrDegree";

const PaymentItem = ({ currentUser, paymentItem, addressId, handleOnChangeQuality }) => {
    const navigate = useNavigate()
    const [provinceAndCityName, setProvinceAndCityName] = useState('')

    useEffect(() => {
        AddressService.getOneAddress(addressId).then(
            (response) => {
                setProvinceAndCityName(response.data.provinceAndCity.name)
            }
        )
    }, [addressId])

    const handleClickSub = () => {
        const prevQuality = paymentItem.quantity
        handleOnChangeQuality(paymentItem.cartItemId, prevQuality, paymentItem.tree.stock, 'sub', -1)
    }

    const handleClickAdd = () => {
        const prevQuality = paymentItem.quantity
        handleOnChangeQuality(paymentItem.cartItemId, prevQuality, paymentItem.tree.stock, 'add', 1)
    }

    const handleEnteredNumber = (num) => {
        const prevQuality = paymentItem.quantity
        handleOnChangeQuality(paymentItem.cartItemId, prevQuality, paymentItem.tree.stock, 'update', num)
    }

    const handleAgreeDelete = () => {
        const prevQuality = paymentItem.quantity
        handleOnChangeQuality(paymentItem.cartItemId, prevQuality, paymentItem.tree.stock, 'delete', 0)
    }

    const handleClickSeeTreeDetails = () => {
        TrackingListTreeService.getTrackingListTreeByUserId(currentUser.id).then(
            (response) => {
                const listTrackingListTree = response.data
                navigate('/treeDetails', { state: { tree: paymentItem.tree, currentUser, listTrackingListTree } });
            }
        )
    }

    return (
        <Fragment>
            <table className="table table-borderless">
                <tbody>
                    <tr className="border-bottom">
                        <td>
                            <div className="d-flex align-items-center">
                                <div className="pic-area">
                                    <img
                                        className="pic"
                                        src={'images/' + paymentItem.tree.imageUrl}
                                        alt=""
                                        style={{ width: "150px", height: "200px" }}
                                        onClick={handleClickSeeTreeDetails}
                                    />
                                </div>
                                <div className="ps-2 d-flex flex-column">
                                    <h4
                                        className="card-title-profile"
                                        onClick={handleClickSeeTreeDetails}
                                    >
                                        <i>
                                            {paymentItem.tree.treeName}
                                        </i>
                                    </h4>
                                    <br />
                                    <dl className="row">
                                        <dt className="col-5">Loại kích thước</dt>
                                        <dd className="col-7">{paymentItem.tree.size}</dd>

                                        <dt className="col-5">Giá tiền</dt>
                                        <dd className="col-7">{paymentItem.tree.price.toLocaleString('vi-VN')}<sup>đ</sup>/1 cây</dd>

                                        <dt className="col-5">Số lượng trong kho</dt>
                                        <dd className="col-7">{paymentItem.tree.stock}</dd>

                                        <dt className="col-5">Vị trí kho</dt>
                                        <dd className="col-7">{provinceAndCityName}</dd>
                                    </dl>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="ps-3">
                                <br />
                                <div>Số lượng</div>
                                <div className="input-group input-spinner payment-text">
                                    <button
                                        type="button"
                                        className="btn btn-icon btn-light"
                                        onClick={handleClickSub}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
                                            <path d="M19 13H5v-2h14v2z"></path>
                                        </svg>
                                    </button>
                                    <input
                                        className="btn btn-light"
                                        value={paymentItem.quantity}
                                        style={{ width: "3rem" }}
                                        onChange={(e) => handleEnteredNumber(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-icon btn-light"
                                        type="button"
                                        onClick={handleClickAdd}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <br />
                                <div
                                    className="btn btn-danger d-flex justify-content-center"
                                    data-bs-toggle="modal"
                                    data-bs-target="#popupFormAgreeOrDegree"
                                >
                                    Xóa
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <PopupAgreeOrDegree content='Bạn có thật sự muốn xóa sản phẩm này?' handleAgreeDelete={handleAgreeDelete} />
        </Fragment>
    );
}

export default PaymentItem;