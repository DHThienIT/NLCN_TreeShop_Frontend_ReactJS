import { Fragment, useState, useEffect } from "react";
import RootService from "../../../services/rootService";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultAddress, setSelectedComponent } from "../../../actions/action";
import AddressInfoItem from "./AddressInfoItem";
import Notification from "../../Notification"

const AddressInfo = () => {
  const { currentUser } = useSelector(state => state.accountReducer)
  const { listAddress } = useSelector(state => state.addressReducer)
  const dispatch = useDispatch()
  let foundAddressItem = []
  const [notification, setNotification] = useState([])

  useEffect(() => {
    listAddress.forEach((address) => {
      if (address.default) dispatch(setDefaultAddress(address))
    })
  }, [listAddress]);

  // const setTimeoutNotification = () => {
  //   setTimeout(() => {
  //     setNotification([])
  //   }, 4000);
  // }

  // const successAddAddress = () => {
  //   setNotification(
  //     <Notification
  //       pushType='success'
  //       pushTitle='Thêm thành công'
  //       pushMessage={'Đã thêm một địa chỉ mới thành công!'}
  //     />
  //   )
  //   setTimeoutNotification()
  // }

  // const successUpdateAddress = () => {
  //   setNotification(
  //     <Notification
  //       pushType='success'
  //       pushTitle='Cập nhật thành công'
  //       pushMessage={'Đã cập nhật địa chỉ thành công!'}
  //     />
  //   )
  //   setTimeoutNotification()
  // }

  const handleAddNewAddress = () => {
    dispatch(setSelectedComponent('FormAddAddress'))
  }

  listAddress.forEach((addressItem) => {
    foundAddressItem.push(
      <AddressInfoItem key={addressItem.addressId} addressItem={addressItem} />
    )
  })

  return (
    <Fragment>
      <div className="col-md-9 border-right">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Địa chỉ người dùng ({listAddress.length})</h4>
            <button
              className="btn btn-primary"
              onClick={handleAddNewAddress}
            >
              Thêm địa chỉ mới
            </button>
          </div>
          <p>Địa chỉ mặc định sẽ để làm địa chỉ giao hàng!</p>
          <hr />
          {foundAddressItem}
        </div>
        {listAddress.length === 0 && (
          <div className="d-flex align-items-center flex-column">
            <img src="https://cdn0.iconfinder.com/data/icons/map-22/210/863-512.png" style={{ width: "10rem", opacity: "0.7" }} alt='' />
            <span>Hiện chưa có địa chỉ.</span>
          </div>
        )}
      </div>
      {notification}
    </Fragment >
  );
}

export default AddressInfo;