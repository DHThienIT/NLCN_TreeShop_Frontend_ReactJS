import { Fragment, useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import AddressService from "../../../services/address.service";
import DeliveryMethodService from "../../../services/deliveryMethod.service";

const ShipmentDetails = ({ currentUser, paymentMethod, onSetCurrentAddress, onSetPaymentMethod }) => {
    // console.log('xxxxxxxxxxxxxx', paymentMethod)
    const navigate = useNavigate()
    const [listAddress, setListAddress] = useState([]);
    const [listDeliveryMethod, setListDeliveryMethod] = useState([]);
    const [currentAddress, setCurrentAddress] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);
    const [selectedOption1, setSelectedOption1] = useState(0);

    useEffect(() => {
        AddressService.getAllAddressInfo(currentUser.id).then(
            (response) => {
                const dataResponse = response.data
                setListAddress(dataResponse)
                dataResponse.map((address) => {
                    if (address.default) setCurrentAddress(address)
                    return (<div key={address}></div>)
                })
            }
        )
        DeliveryMethodService.getAllDeliveryMethod().then(
            (response) => {
                setListDeliveryMethod(response)
            }
        )
    }, [])

    useEffect(() => {
        onSetCurrentAddress(currentAddress)
        if (listDeliveryMethod !== [])
            onSetPaymentMethod(listDeliveryMethod[selectedOption1])
    }, [currentAddress])

    const handleChangeAddress = (index) => {
        setCurrentAddress(listAddress[index])
        setSelectedOption(index)
    }

    const handleChangeDeliveryMethod = (index) => {
        setSelectedOption1(index)
        onSetPaymentMethod(listDeliveryMethod[index])
    }

    // console.log('xxxxx', listDeliveryMethod)
    return (
        <Fragment>
            <div className="card px-md-3 px-2 pt-4">
                <h5 className="unregistered mb-4"> <span className="py-1">Thông tin giao hàng</span> </h5>

                <div className="d-flex justify-content-between pb-2">
                    Người nhận
                    <p>{currentAddress.name}</p>
                </div>
                <div className="d-flex justify-content-between pb-2">
                    Số điện thoại
                    <p>{currentAddress.phone}</p>
                </div>
                <b>Địa chỉ nhận: {currentAddress.ward && (currentAddress.specificAddress + ', ' + currentAddress.ward.name + ', ' + currentAddress.countryAndDistrict.name + ', ' + currentAddress.provinceAndCity.name)}</b>
                <br />Chọn nhanh địa chỉ khác:
                <select
                    className="btn btn-light"
                    value={selectedOption}
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
                    onClick={() => navigate('/accountInformation', { state: { switchComponent: 'addressInfo' } })}
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
                    value={selectedOption1}
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
                    {paymentMethod && <b>{paymentMethod.estimatedTime}</b>}
                </div>
                <div className="d-flex justify-content-between pb-3">
                    <b>Phí vận chuyển:</b>
                    {paymentMethod && <b className="attention-text">{paymentMethod.price.toLocaleString('vi-VN')}<sup>đ</sup></b>}
                </div>
            </div>
        </Fragment>
    );
}

export default memo(ShipmentDetails);