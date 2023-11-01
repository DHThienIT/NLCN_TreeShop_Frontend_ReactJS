import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RootService from "../../../services/rootService";
import PopupAgreeOrDegree from "../../popupComponent/PopupAgreeOrDegree";
import { setCart, setOneTreeInfo } from "../../../actions/action";

const PaymentItem = ({ paymentItem }) => {
    const { currentUser } = useSelector(state => state.accountReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [provinceAndCityName, setProvinceAndCityName] = useState('')
    const [image, setImage] = useState();

    useEffect(() => {
        RootService.ImageService.getTreeImage(paymentItem.tree.treeId).then(
            (response) => {
                setImage(response)
            }
        )

        RootService.AddressService.getOneAddress(paymentItem.tree.supplier.address_id).then(
            (response) => {
                setProvinceAndCityName(response.data.provinceAndCity.name)
            }
        )
    }, [paymentItem])

    const handleOnChangeQuality = (prevQuality, numTreesInStock, action, num) => {
        // console.log('number', prevQuality, numTreesInStock, action, num)
        // console.log('assssss');
        let quantity
        if (action === 'add' || action === 'sub') {
            quantity = prevQuality + num
        } else if (action === 'update') {
            if (!num) quantity = 1
            else quantity = num
        }

        if (quantity <= numTreesInStock) {
            RootService.CartService.updateTreeInCart(currentUser.id, paymentItem.cartItemId, quantity).then(
                (response) => {
                    dispatch(setCart(response.data))
                }
            )
        }
    }

    const handleClickSub = () => {
        const prevQuality = paymentItem.quantity
        handleOnChangeQuality(prevQuality, paymentItem.tree.stock, 'sub', -1)
    }

    const handleClickAdd = () => {
        const prevQuality = paymentItem.quantity
        handleOnChangeQuality(prevQuality, paymentItem.tree.stock, 'add', 1)
    }

    const handleEnteredNumber = (num) => {
        const prevQuality = paymentItem.quantity
        handleOnChangeQuality(prevQuality, paymentItem.tree.stock, 'update', num)
    }

    const handleClickSeeTreeDetails = () => {
        dispatch(setOneTreeInfo(paymentItem.tree))
        navigate('/treeDetails')
    }
    // console.log('ahsj: ', paymentItem.quantity);
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
                                        src={image}
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
                                        <dt className="col-6">Loại kích thước</dt>
                                        <dd className="col-6">{paymentItem.tree.size}</dd>

                                        <dt className="col-6">Giá tiền</dt>
                                        <dd className="col-6">{paymentItem.tree.price.toLocaleString('vi-VN')}<sup>đ</sup>/1 cây</dd>

                                        <dt className="col-6">Số lượng trong kho</dt>
                                        <dd className="col-6">{paymentItem.tree.stock}</dd>

                                        <dt className="col-6">Vị trí kho</dt>
                                        <dd className="col-6">{provinceAndCityName}</dd>
                                    </dl>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="ps-3">
                                <br />
                                <div>Số lượng</div>
                                <div className="input-group input-spinner payment-text">
                                    {paymentItem.quantity !== 1 ? (
                                        <button
                                            type="button"
                                            className="btn btn-icon btn-light"
                                            onClick={handleClickSub}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
                                                <path d="M19 13H5v-2h14v2z"></path>
                                            </svg>
                                        </button>
                                    ) : (
                                        <div
                                            className="btn btn-icon btn-light"
                                            data-bs-toggle="modal"
                                            data-bs-target="#popupFormAgreeOrDegree"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
                                                <path d="M19 13H5v-2h14v2z"></path>
                                            </svg>
                                        </div>
                                    )}
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
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <PopupAgreeOrDegree content='Bạn có thật sự muốn xóa sản phẩm này?' handleAgreeDelete={handleClickSub} />
        </Fragment>
    );
}

export default PaymentItem;