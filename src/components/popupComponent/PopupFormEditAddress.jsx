import { Fragment, useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import AddressService from "../../services/address.service";
import Error from "../../errors/Errors";

const { required, vfullName } = Error

const PopupFormEditAddress = ({ addressId, currentUser, switchPopup, restartListAddress, successAddAddress, successUpdateAddress, handlePopupClose }) => {
  // console.log('addressId', addressId, switchPopup)

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

  const [provinceAndCityList, setProvinceAndCityList] = useState([]);
  const [countryAndDistrictList, setCountryAndDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const [openContent, setOpenContent] = useState({            //3 nút hiện list address
    open: false,
    switchContent: ''
  })

  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [specificAddress, setSpecificAddress] = useState('');
  const [setDefault, setSetDefault] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    AddressService.getAllProvinceAndCity().then(
      (response) => {
        setProvinceAndCityList(response.data)
      }
    )
    AddressService.getAllCountryAndDistrict().then(
      (response) => {
        setCountryAndDistrictList(response.data)
      }
    )
    AddressService.getAllWards().then(
      (response) => {
        setWardList(response.data)
      }
    )
    if (addressId) {
      // console.log('11111111111111111111111111111111111')
      AddressService.getOneAddress(addressId).then(
        (response) => {
          const address = response.data
          setRecipientName(address.name)
          setPhone(address.phone)
          setProvinceAndCityName({ id: address.provinceAndCity.provinceAndCityId, name: address.provinceAndCity.name })
          setCountryAndDistrictName({ id: address.countryAndDistrict.countryAndDistrictId, name: address.countryAndDistrict.name })
          setWardName({ id: address.ward.wardId, name: address.ward.name })
          setSpecificAddress(address.specificAddress)
        }
      )
    }
  }, [addressId])

  const handleSubmitForm = (e) => {
    e.preventDefault();

    form.current.validateAll();

    if (provinceAndCityName.name === '...')
      setMessage('Tỉnh/Thành phố chưa được chọn!')
    else if (countryAndDistrictName.name === '...')
      setMessage('Quận/Huyện chưa được chọn!')
    else if (wardName.name === '...')
      setMessage('Phường/Xã chưa được chọn!')
    else {
      setMessage('')

      if (!addressId) {
        // console.log('1-----------', currentUser.id, recipientName, phone, provinceAndCityName.id, countryAndDistrictName.id, wardName.id, specificAddress, setDefault)
        AddressService.createNewAddress(currentUser.id, recipientName, phone, provinceAndCityName.id, countryAndDistrictName.id, wardName.id, specificAddress, setDefault).then(
          (response) => {
            // console.log(response.data)
            if (response.content === 'NotFound') setMessage('Địa chỉ đã tồn tại, xin vui lòng nhập một địa chỉ cụ thể khác!')
            else {
              restartListAddress()
              handlePopupClose()
              successAddAddress()
            }
          }
        )
      } else {
        // console.log('2-----------')
        AddressService.updateAddress(addressId, currentUser.id, recipientName, phone, provinceAndCityName.id, countryAndDistrictName.id, wardName.id, specificAddress, setDefault).then(
          (response) => {
            console.log(response)
            restartListAddress()
            handlePopupClose()
            successUpdateAddress()
          }
        )
      }
    }
  }

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

  // console.log('xxxxx11: ',switchPopup)

  return (
    <Fragment>
      <div
        className="modal fade"
        id="popupForm"
        tabIndex="-1"
        aria-labelledby="popupFormLabel"
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="popupFormLabel">
                {switchPopup === 'Create' && 'Thêm địa chỉ'}
                {switchPopup === 'Edit' && 'Chỉnh sửa địa chỉ'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <Form
              ref={form}
              onSubmit={handleSubmitForm}
            >
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
                        setRecipientName(e.target.value)
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
                        setPhone(e.target.value)
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
                  <div class="scrollable-list">
                    <ul class="list-group">
                      {provinceAndCityList.map(item => {
                        console.log(item)
                        return (
                          <li
                            key={item.provinceAndCityId}
                            class="list-group-item"
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
                  <div class="scrollable-list">
                    <ul class="list-group">
                      {countryAndDistrictList.map(item => {
                        return (
                          <li
                            key={item.countryAndDistrictId}
                            class="list-group-item"
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
                  <div class="scrollable-list">
                    <ul class="list-group">
                      {wardList.map(item => {
                        return (
                          <li
                            key={item.wardId}
                            class="list-group-item"
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
                      setSpecificAddress(e.target.value)
                      handleOpenContent()
                    }}
                    validations={[required]}
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="checkbox"
                    checked={setDefault}
                    className="d-inline-block"
                    id="checkbox"
                    onChange={() => (setSetDefault(!setDefault))}
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
                >
                  Lưu
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  style={{ width: "6rem" }}
                  onClick={() => handlePopupClose()}
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
          </div>
        </div>
      </div >
    </Fragment >
  );
}

export default PopupFormEditAddress;