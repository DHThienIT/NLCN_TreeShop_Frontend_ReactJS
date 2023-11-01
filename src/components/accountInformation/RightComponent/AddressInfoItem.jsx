import { Fragment, useState, useEffect } from "react";
import RootService from "../../../services/rootService";
import PopupAgreeOrDegree from "../../popupComponent/PopupAgreeOrDegree";
import { useDispatch, useSelector } from "react-redux";
import { restartListAddress, setAddresseId, setListAddress, setSelectedComponent } from "../../../actions/action";

const AddressInfoItem = ({ addressItem }) => {
    const { currentUser } = useSelector(state => state.accountReducer)
    const { defaultAddress } = useSelector(state => state.addressReducer)
    const dispatch = useDispatch()

    const handleSetDefaultAddress = () => {
        if (defaultAddress.addressId !== addressItem.addressId) {
            RootService.AddressService.setDefaultAddress(currentUser.id, defaultAddress.addressId, addressItem.addressId).then(
                () => { dispatch(restartListAddress(currentUser)) }
            )
        }
    }

    const handleAgreeDelete = () => {
        RootService.AddressService.deleteAddress(currentUser.id, addressItem.addressId).then(
            () => { dispatch(restartListAddress(currentUser)) }
        )
    }

    const handleEditNewAddress = () => {
        dispatch(setSelectedComponent('FormEditAddress'))
        dispatch(setAddresseId(addressItem.addressId))
    }

    const handleDeleteAddress = () => {
        dispatch(setAddresseId(addressItem.addressId))
    }

    return (
        <Fragment>
            <div className="row mt-2" key={addressItem.AddressId}><br />
                <div className="row d-flex align-items-center">
                    {
                        <div className="col-md-10">
                            <div className="row">
                                <h5>Người nhận: {addressItem.name}</h5>
                                <div>Số điện thoại (+84): {addressItem.phone}</div>
                                <div>Địa chỉ: {addressItem.specificAddress + ', ' + addressItem.ward.name + ', '
                                    + addressItem.countryAndDistrict.name + ', ' + addressItem.provinceAndCity.name}
                                </div>
                            </div><br />
                        </div>
                    }
                    <div className="col-md-1">
                        <button
                            className="btn btn-my-page"
                            onClick={handleEditNewAddress}
                        >
                            Sửa
                        </button>
                    </div>

                    {!addressItem.default && (
                        <div className="col-md-1">
                            <button
                                className="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#popupFormAgreeOrDegree"
                                onClick={handleDeleteAddress}
                            >
                                Xóa
                            </button>
                        </div>
                    )}

                    <div className="d-flex justify-content-between">
                        <div className="d-inline-block">
                            {(defaultAddress.addressId === addressItem.addressId) && (
                                <div className="btn btn-secondary">Mặc định</div>
                            )}
                        </div>
                        {(defaultAddress.addressId !== addressItem.addressId) && (
                            <div className="d-inline-block">
                                <button
                                    type="text"
                                    className="btn btn-light"
                                    onClick={handleSetDefaultAddress}
                                >
                                    Thiết lập mặc định
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <hr /><br />
            </div>
            <PopupAgreeOrDegree
                content='Bạn có thật sự muốn xóa địa chỉ này?'
                handleAgreeDelete={handleAgreeDelete}
            />
        </Fragment >
    );
}

export default AddressInfoItem;