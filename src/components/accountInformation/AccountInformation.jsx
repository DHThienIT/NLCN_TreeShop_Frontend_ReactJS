import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RootService from "../../services/rootService";
import { useDispatch, useSelector } from "react-redux";

import ProfileInfo from "./RightComponent/ProfileInfo";
import AddressInfo from "./RightComponent/AddressInfo";
import ChangePassword from "./RightComponent/ChangePassword";
import InvoiceInfo from "./RightComponent/InvoiceInfo";
import FormEditAddress from "./RightComponent/FormEditAddress";
import { setAccountInformation, setAvatarImage, setSelectedComponent } from "../../actions/action";

const AccountInformation = () => {
  const { currentUser, avatarImage, accountInformation } = useSelector(state => state.accountReducer)
  const { selectedComponent } = useSelector(state => state.mainReducer)
  const dispatch = useDispatch()

  const location = useLocation();
  const [switchComponent, setSwitchComponent] = useState();

  useEffect(() => {
    if (currentUser) {
      RootService.ImageService.getAvatarImage(currentUser.id).then(
        (response) => {
          dispatch(setAvatarImage(response))
        }
      )

      RootService.UserService.getUserInfo(currentUser.id).then(
        (response) => {
          dispatch(setAccountInformation(response.data))
        }
      )
    }
    return () => {
      dispatch(setSelectedComponent(''))
    }
  }, [currentUser])

  useEffect(() => {
    if (selectedComponent === 'ProfileInfo' || selectedComponent === '') setSwitchComponent(<ProfileInfo />)
    else if (selectedComponent === 'AddressInfo') setSwitchComponent(<AddressInfo />)
    else if (selectedComponent === 'FormAddAddress') setSwitchComponent(<FormEditAddress />)
    else if (selectedComponent === 'FormEditAddress') setSwitchComponent(<FormEditAddress />)
    else if (selectedComponent === 'ChangePassword') setSwitchComponent(<ChangePassword />)
    else if (selectedComponent === 'InvoiceInfo') setSwitchComponent(<InvoiceInfo />)
  }, [selectedComponent])

  const handleClickInvoiceInformation = () => {
    dispatch(setSelectedComponent('InvoiceInfo'))
  }

  return (
    <Fragment>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 ">
              <img
                className="rounded-circle mt-5"
                width="160px"
                src={avatarImage}
                style={{ width: '10rem', height: '10rem' }}
                alt=''
              />
              <br />

              <b className="font-weight-bold">{accountInformation && (accountInformation.lastname + ' ' + accountInformation.firstname)}</b>
            </div>
            {/* <div className="d-flex flex-column align-items-center"> */}
            <div className="container">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">
                  <div className="card-title-profile">
                    <i className="fa-sharp fa-solid fa-address-card"></i>{' '}
                    <span >Tài Khoản Của Tôi</span>
                  </div>
                  <div className="container">
                    <div
                      className="card-title-profile"
                      style={(selectedComponent === 'ProfileInfo' && { color: "red" }) || {}}
                      onClick={() => dispatch(setSelectedComponent('ProfileInfo'))}
                    >
                      Hồ Sơ
                    </div>
                    <div
                      className="card-title-profile"
                      style={((selectedComponent === 'AddressInfo' || selectedComponent === 'FormAddAddress' || selectedComponent === 'FormEditAddress') && { color: "red" }) || {}}
                      onClick={() => dispatch(setSelectedComponent('AddressInfo'))}
                    >
                      Địa Chỉ
                    </div>
                    <div
                      className="card-title-profile"
                      style={(selectedComponent === 'ChangePassword' && { color: "red" }) || {}}
                      onClick={() => dispatch(setSelectedComponent('ChangePassword'))}
                    >
                      Đổi Mật Khẩu
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">
                  <div className="card-title-profile" onClick={handleClickInvoiceInformation}>
                    <i className="fas fa-file-invoice"></i>{' '}
                    <span
                      style={(selectedComponent === 'InvoiceInfo' && { color: "red" }) || {}}
                    >Đơn mua</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">
                  <div className="card-title-profile" onClick={() => { }}>
                    <i className="fa-solid fa-bell"></i>{' '}
                    <span >Thông báo</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">
                  <div className="card-title-profile" onClick={() => { }}>
                    <i className="fa-solid fa-gifts"></i>{' '}
                    <span >Kho voucher</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {switchComponent}
        </div>
      </div>
    </Fragment >
  )
};

export default AccountInformation;
