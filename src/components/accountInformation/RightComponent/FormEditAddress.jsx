import { Fragment, useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import RootService from "../../../services/rootService";
import Error from "../../../errors/Errors"
import { useDispatch, useSelector } from "react-redux";
import {
    restartListAddress,
    setAddresseId, setCountryAndDistrictList, setMessage, setPhone,
    setProvinceAndCityList, setRecipientName, setSelectedComponent, setSpecificAddress,
    setWardList, switchCheckDefault
} from "../../../actions/action";

const { required, vfullName } = Error

const FormEditAddress = () => {
    const { currentUser, phone } = useSelector(state => state.accountReducer)
    const {
        listAddress, addressId, provinceAndCityList, countryAndDistrictList, wardList,
        recipientName, specificAddress, checkDefault
    } = useSelector(state => state.addressReducer)
    const { message } = useSelector(state => state.mainReducer)
    const dispatch = useDispatch()

    const form = useRef();
    const [provinceAndCityName, setProvinceAndCityName] = useState({
        id: '',
        name: '...'
    });
    const [countryAndDistrictName, setCountryAndDistrictName] = useState({
        id: '',
        name: '...'
    });
    const [wardName, setWardName] = useState({
        id: '',
        name: '...'
    });

    const [openContent, setOpenContent] = useState({            //3 nút hiện list address
        open: false,
        switchContent: ''
    })
    const [title, setTitle] = useState('Thêm địa chỉ mới');

    useEffect(() => {
        RootService.AddressService.getAllProvinceAndCity().then(
            (response) => {
                dispatch(setProvinceAndCityList(response.data))
            }
        )
        RootService.AddressService.getAllCountryAndDistrict().then(
            (response) => {
                dispatch(setCountryAndDistrictList(response.data))
            }
        )
        RootService.AddressService.getAllWards().then(
            (response) => {
                dispatch(setWardList(response.data))
            }
        )
        if (addressId) {
            RootService.AddressService.getOneAddress(addressId).then(
                (response) => {
                    const address = response.data
                    setTitle('Chỉnh sửa địa chỉ')
                    dispatch(setRecipientName(address.name))
                    dispatch(setPhone(address.phone))
                    dispatch(setSpecificAddress(address.specificAddress))
                    setProvinceAndCityName({ id: address.provinceAndCity.provinceAndCityId, name: address.provinceAndCity.name })
                    setCountryAndDistrictName({ id: address.countryAndDistrict.countryAndDistrictId, name: address.countryAndDistrict.name })
                    setWardName({ id: address.ward.wardId, name: address.ward.name })
                    if (address.default) dispatch(switchCheckDefault(true)); else dispatch(switchCheckDefault(false))
                }
            )
        }
        return () => {
            dispatch(setRecipientName(''))
            dispatch(setPhone(''))
            dispatch(setSpecificAddress(''))
            dispatch(switchCheckDefault(false))
            dispatch(setAddresseId(0))
        }
    }, [addressId])

    const handleOpenContent = (content) => {
        if (!content) {
            setOpenContent({
                open: false,
                switchContent: ''
            })
        } else if (openContent.switchContent === content) {
            setOpenContent({
                open: !openContent.open,
                switchContent: ''
            })
        } else {
            setOpenContent({
                open: true,
                switchContent: content
            })
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        form.current.validateAll();

        if (provinceAndCityName.name === '...')
            dispatch(setMessage('Tỉnh/Thành phố chưa được chọn!'))
        else if (countryAndDistrictName.name === '...')
            dispatch(setMessage('Quận/Huyện chưa được chọn!'))
        else if (wardName.name === '...')
            dispatch(setMessage('Phường/Xã chưa được chọn!'))
        else {
            dispatch(setMessage(''))
            if (!addressId) {
                RootService.AddressService.createNewAddress(currentUser.id, recipientName, phone, provinceAndCityName.id, countryAndDistrictName.id, wardName.id, specificAddress, checkDefault).then(
                    (response) => {
                        if (response.content === 'NotFound')
                            setMessage('Địa chỉ đã tồn tại, xin vui lòng nhập một địa chỉ cụ thể khác!')
                        else {
                            // onClickSaveOrExitEditAddress('addNewSuccess')                       
                        }
                    }
                )
            } else {
                RootService.AddressService.updateAddress(addressId, currentUser.id, recipientName, phone, provinceAndCityName.id, countryAndDistrictName.id, wardName.id, specificAddress, checkDefault).then(
                    () => { }
                )
            }
            dispatch(restartListAddress(currentUser))
            dispatch(setSelectedComponent('AddressInfo'))
        }
    }

    const handleClickCancel = () => {
        dispatch(setSelectedComponent('AddressInfo'))
    }

    return (
        <Fragment>
            <Form
                ref={form}
                className="col-md-8 border-right p-5 py-5"
                style={{ border: "1px solid #333" }}
                onSubmit={handleSubmitForm}
            >
                <h4 className="text-right text-center">
                    {title}
                </h4>
                <hr />
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="username" className="form-label">
                                Tên người nhận (VD: Nguyễn Văn A)
                            </label>
                            <Input
                                className="form-control"
                                value={recipientName}
                                onChange={(e) => {
                                    dispatch(setRecipientName(e.target.value))
                                    handleOpenContent()
                                }}
                                validations={[required, vfullName]}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">
                                Số điện thoại:
                            </label>
                            <Input
                                type="number"
                                className="form-control"
                                value={phone}
                                onChange={(e) => {
                                    dispatch(setPhone(e.target.value))
                                    handleOpenContent()
                                }}
                                validations={[required]}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="username" className="form-label">
                                Tỉnh/Thành phố:
                            </label>
                            <Input
                                type="button"
                                className="form-control"
                                value={provinceAndCityName.name}
                                onClick={() => handleOpenContent('provinceAndCity')}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="username" className="form-label">
                                Quận/Huyện:
                            </label>
                            <Input
                                type="button"
                                className="form-control"
                                value={countryAndDistrictName.name}
                                onClick={() => handleOpenContent('countryAndDistrict')}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="username" className="form-label">
                                Phường/Xã:
                            </label>
                            <Input
                                type="button"
                                className="form-control"
                                value={wardName.name}
                                onClick={() => handleOpenContent('ward')}
                            />
                        </div>
                    </div>

                    {openContent.open && openContent.switchContent === 'provinceAndCity' && (
                        <div className="scrollable-list">
                            <ul className="list-group">
                                {provinceAndCityList.map(item => {
                                    return (
                                        <li
                                            key={item.provinceAndCityId}
                                            className="list-group-item"
                                            onClick={() => {
                                                setProvinceAndCityName({ name: item.name, id: item.provinceAndCityId })
                                                handleOpenContent()
                                            }}
                                        >
                                            {item.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}

                    {openContent.open && openContent.switchContent === 'countryAndDistrict' && (
                        <div className="scrollable-list">
                            <ul className="list-group">
                                {countryAndDistrictList.map(item => {
                                    return (
                                        <li
                                            key={item.countryAndDistrictId}
                                            className="list-group-item"
                                            onClick={() => {
                                                setCountryAndDistrictName({ name: item.name, id: item.countryAndDistrictId })
                                                handleOpenContent()
                                            }}
                                        >
                                            {item.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}

                    {openContent.open && openContent.switchContent === 'ward' && (
                        <div className="scrollable-list">
                            <ul className="list-group">
                                {wardList.map(item => {
                                    return (
                                        <li
                                            key={item.wardId}
                                            className="list-group-item"
                                            onClick={() => {
                                                setWardName({ name: item.name, id: item.wardId })
                                                handleOpenContent()
                                            }}
                                        >
                                            {item.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}

                    <div className="col-md-12">
                        <label htmlFor="password" className="form-label">
                            Địa chỉ cụ thể:
                        </label>
                        <Textarea
                            className="form-control"
                            rows="2"
                            value={specificAddress}
                            onChange={(e) => {
                                dispatch(setSpecificAddress(e.target.value))
                                handleOpenContent()
                            }}
                            validations={[required]}
                        />
                    </div>
                    <div className="col-md-12">
                        <input
                            type="checkbox"
                            checked={checkDefault}
                            className="d-inline-block"
                            id="checkbox"
                            onChange={() => dispatch(switchCheckDefault(!checkDefault))}
                        />
                        <label
                            className="d-inline-block"
                            htmlFor="checkbox"
                        >{'_'}Đặt làm mặc định</label>
                    </div>
                </div>

                <div className="modal-footer d-flex justify-content-center">
                    <button
                        className="btn btn-my-page"
                        style={{ width: "6rem" }}
                        onClick={handleSubmitForm}
                    >
                        Lưu
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ width: "6rem" }}
                        onClick={handleClickCancel}
                    >
                        Hủy
                    </button>
                    {message && (
                        <div className="col-md-12">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </div>
            </Form>
        </Fragment >
    );
}

export default FormEditAddress;