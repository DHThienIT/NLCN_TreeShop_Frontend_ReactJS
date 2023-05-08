import { Fragment, useState, useEffect } from "react";
import AddressService from "../../../services/address.service";
import Notification from "../../Notification";
import PopupFormEditAddress from "../../popupComponent/PopupFormEditAddress";
import PopupAgreeOrDegree from "../../popupComponent/PopupAgreeOrDegree";

const AddressInfo = ({ currentUser }) => {
  const [listAddresses, setListAddresses] = useState([]);
  const [addressIdWasSetDefault, setAddressIdWasSetDefault] = useState([]);
  const [switchPopup, setSwitchPopup] = useState();
  const [addressId, setAddressId] = useState()
  const [notification, setNotification] = useState([])

  useEffect(() => {
    restartListAddress()

    // const popupElement = popupRef.current;
    // // Thêm event listener cho sự kiện hidden.bs.modal
    // popupElement.addEventListener('hidden.bs.modal', handlePopupClose);
    // // Hủy bỏ event listener khi component bị unmount
    // return () => {
    //   popupElement.removeEventListener('hidden.bs.modal', handlePopupClose);
    // };
  }, []);

  const restartListAddress = () => {
    AddressService.getAllAddressInfo(currentUser.id).then(
      (response) => {
        const dataResponse = response.data
        setListAddresses(dataResponse)
        dataResponse.map((address) => {
          if (address.default) setAddressIdWasSetDefault(address.addressId)
          return (<div key={address}></div>)
        })
      }
    )
  }

  const handleSetDefaultAddress = (addressIdWasSetDefault, addressIdWillSetDefault) => {
    if (addressIdWasSetDefault !== addressIdWillSetDefault) {
      AddressService.setDefaultAddress(addressIdWasSetDefault, addressIdWillSetDefault).then(
        () => {
          restartListAddress()
        }
      )
    }
  }

  const handlePopupClose = () => {
    setSwitchPopup('')
  };

  const setTimeoutNotification = () => {
    setTimeout(() => {
      setNotification([])
    }, 4000);
  }

  const successAddAddress = () => {
    setNotification(
      <Notification
        pushType='success'
        pushTitle='Thêm thành công'
        pushMessage={'Bạn đã thêm một địa chỉ mới thành công!'}
      />
    )
    setTimeoutNotification()
  }

  const successUpdateAddress = () => {
    setNotification(
      <Notification
        pushType='success'
        pushTitle='Cập nhật thành công'
        pushMessage={'Bạn đã cập nhật thành công địa chỉ!'}
      />
    )
    setTimeoutNotification()
  }

  const handleAgreeDelete = () => {
    AddressService.deleteAddress(addressId).then(
      () => {
        restartListAddress()
      }
    )
  }
  // console.log('switchPopup', switchPopup)
  return (
    <Fragment>
      <div className="col-md-9 border-right">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Địa chỉ người dùng ({listAddresses.length})</h4>
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#popupForm"
              onClick={() => {
                setSwitchPopup('Create')
              }}
            >
              Thêm địa chỉ mới
            </button>
          </div>
          <p>Địa chỉ mặc định sẽ để làm địa chỉ giao hàng!</p>
          <hr />

          {listAddresses.map(addressInfo => {
            return (
              <div className="row mt-2" key={addressInfo.AddressId}><br />
                <div className="row d-flex align-items-center">
                  {
                    <div className="col-md-10">
                      <div className="row">
                        <h5>Người nhận: {addressInfo.name}</h5>
                        <div>Số điện thoại (+84): {addressInfo.phone}</div>
                        <div>Địa chỉ: {addressInfo.specificAddress + ', ' + addressInfo.ward.name + ', '
                          + addressInfo.countryAndDistrict.name + ', ' + addressInfo.provinceAndCity.name}
                        </div>
                      </div><br />
                    </div>
                  }
                  <div className="col-md-1">
                    <button
                      className="btn btn-my-page"
                      data-bs-toggle="modal"
                      data-bs-target="#popupForm"
                      onClick={() => {
                        setSwitchPopup('Edit')
                        setAddressId(addressInfo.addressId)
                      }}
                    >
                      Sửa
                    </button>
                  </div>

                  {!addressInfo.default && (
                    <div className="col-md-1">
                      <button
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#popupFormAgreeOrDegree"
                        onClick={() => {
                          setSwitchPopup('Delete')
                          setAddressId(addressInfo.addressId)
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  )}

                  <div className="d-flex justify-content-between">
                    <div className="d-inline-block">
                      {addressInfo.default && (
                        <div className="btn btn-secondary">Mặc định</div>
                      )}
                    </div>
                    {!addressInfo.default && (
                      <div className="d-inline-block">
                        <button
                          type="text"
                          className="btn btn-light"
                          onClick={() => handleSetDefaultAddress(addressIdWasSetDefault, addressInfo.addressId)}
                        >
                          Thiết lập mặc định
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <hr /><br />
              </div>
            )
          })}
        </div>
        {listAddresses.length === 0 && (
          <div className="d-flex align-items-center flex-column">
            <img src="https://cdn0.iconfinder.com/data/icons/map-22/210/863-512.png" style={{ width: "10rem", opacity: "0.7" }} alt='' />
            <span>Hiện chưa có địa chỉ.</span>
          </div>
        )}
      </div>

      {switchPopup === 'Create' && (
        <>
          {console.log('11111111111111111')}
          <PopupFormEditAddress
            currentUser={currentUser}
            switchPopup={switchPopup}
            restartListAddress={restartListAddress}
            successAddAddress={successAddAddress}
            handlePopupClose={handlePopupClose}
          />
        </>
      )}
      {switchPopup === 'Edit' && (
        <>
          {console.log('222222222222222222222')}
          <PopupFormEditAddress
            currentUser={currentUser}
            switchPopup={switchPopup}
            addressId={addressId}
            restartListAddress={restartListAddress}
            successUpdateAddress={successUpdateAddress}
            handlePopupClose={handlePopupClose}
          />
        </>
      )}
      <PopupAgreeOrDegree
        content='Bạn có thật sự muốn xóa địa chỉ này?'
        handleAgreeDelete={handleAgreeDelete}
      />

      {notification}
    </Fragment >
  );
}

export default AddressInfo;