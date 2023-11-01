import { Fragment, useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import RootService from "../../../services/rootService";
import { useDispatch, useSelector } from "react-redux";
import {
    setAddresseId, setDefaultAddress, setListDeliveryMethod, setCurrentDeliveryMethod,
    setSelectedAddressId, setSelectedComponent, setSelectedDeliveryMethodId, setShippingFee
} from "../../../actions/action";

const ShipmentDetails = () => {
    const { listDeliveryMethod, curentDeliveryMethod, selectedAddressId, selectedDeliveryMethodId } = useSelector(state => state.orderReducer)
    const { listAddress, defaultAddress } = useSelector(state => state.addressReducer)
    // const { currentUser } = useSelector(state => state.accountReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        RootService.DeliveryMethodService.getAllDeliveryMethod().then(
            (response) => {
                dispatch(setListDeliveryMethod(response))
                dispatch(setCurrentDeliveryMethod(response[0]))
                dispatch(setShippingFee(response[0].price))
            }
        )
    }, [])

    useEffect(() => {
        let index = 0
        listAddress.map((address) => {
            if (address.default) {
                dispatch(setDefaultAddress(address))
                dispatch(setSelectedAddressId(index))
            }
            index++
        })
    }, [listAddress])

    const handleChangeAddress = (index) => {
        dispatch(setSelectedAddressId(index))
        dispatch(setDefaultAddress(listAddress[index]))
    }

    const handleChangeDeliveryMethod = (index) => {
        dispatch(setSelectedDeliveryMethodId(index))
        dispatch(setCurrentDeliveryMethod(listDeliveryMethod[index]))
        dispatch(setShippingFee(listDeliveryMethod[index].price))
    }

    const handleEditAddress = () => {
        dispatch(setAddresseId(defaultAddress.addressId))
        dispatch(setSelectedComponent('FormEditAddress'))
        navigate('/accountInformation')
    }

    return (
        <Fragment>
            <div className="card px-md-3 px-2 pt-4">
                <h5 className="unregistered mb-4"> <span className="py-1">Thông tin giao hàng</span> </h5>

                <div className="d-flex justify-content-between pb-2">
                    Người nhận
                    <p>{defaultAddress.name}</p>
                </div>
                <div className="d-flex justify-content-between pb-2">
                    Số điện thoại
                    <p>{defaultAddress.phone}</p>
                </div>
                <b>Địa chỉ nhận: {defaultAddress.ward && (defaultAddress.specificAddress + ', ' + defaultAddress.ward.name + ', ' + defaultAddress.countryAndDistrict.name + ', ' + defaultAddress.provinceAndCity.name)}</b>
                <br />Chọn nhanh địa chỉ khác:
                <select
                    className="btn btn-light"
                    value={selectedAddressId}
                    onChange={(e) => handleChangeAddress(e.target.value)}
                >
                    {
                        listAddress.map((address, index) => {
                            return (
                                <option
                                    key={index}
                                    value={index}
                                >
                                    {address.specificAddress + ', ' + address.ward.name}
                                </option>
                            )
                        })
                    }
                </select>
                <button
                    className="btn btn-my-page btn-change-address"
                    onClick={handleEditAddress}
                >
                    Chính sửa địa chỉ
                </button>
                <br />
                <hr /><br />
                <div className="d-flex justify-content-between">
                    Hình thức vận chuyển:
                </div>
                <select
                    className="btn btn-light"
                    value={selectedDeliveryMethodId}
                    onChange={(e) => handleChangeDeliveryMethod(e.target.value)}
                >
                    {
                        listDeliveryMethod.map((deliveryMethod, index) => {
                            return (
                                <option
                                    key={index}
                                    value={index}
                                >
                                    {deliveryMethod.details}
                                </option>
                            )
                        })
                    }
                </select>
                <br />
                <div className="d-flex justify-content-between pb-3">
                    <b>Thời gian giao hàng dự kiến:</b>
                    {curentDeliveryMethod && <b>{curentDeliveryMethod.estimatedTime}</b>}
                </div>
                <div className="d-flex justify-content-between pb-3">
                    <b>Phí vận chuyển:</b>
                    {curentDeliveryMethod && <b className="attention-text">{curentDeliveryMethod.price.toLocaleString('vi-VN')}<sup>đ</sup></b>}
                </div>
            </div>
        </Fragment>
    );
}

export default memo(ShipmentDetails);