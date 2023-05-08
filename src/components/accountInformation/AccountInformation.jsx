import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import { Fragment, useState, useEffect } from "react";
import ProfileInfo from "./RightComponent/ProfileInfo";
import AddressInfo from "./RightComponent/AddressInfo";
import ChangePassword from "./RightComponent/ChangePassword";
import { useLocation } from "react-router-dom";
import InvoiceInfo from "./RightComponent/InvoiceInfo";

const AccountInformation = () => {
  const currentUser = AuthService.getCurrentUser();
  const location = useLocation();
  let { switchComponent } = location.state || {}

  const [email, setEmail] = useState();
  const [userImage, setUserImage] = useState();
  const [accountInformation, setAccountInformation] = useState({ userPhoto: 'img.jpg' });
  const [switchContent, setSwitchContent] = useState({
    selected: '',
    component: false
  });

  useEffect(() => {
    if (switchComponent === 'addressInfo') {
      handleClickAddressInformation()
    } else {
      UserService.getUserInfo(currentUser.id).then(
        (response) => {
          setEmail(response.data.email)
          setUserImage(response.data.userImage)
          setAccountInformation(response.data)
          setSwitchContent({
            selected: 'accountInfo',
            component: <ProfileInfo accountInformation={response.data} currentUser={currentUser} />
          })
        }
      )
    }
  }, [])

  const handleClickAccountInformation = () => {
    setSwitchContent({
      selected: 'accountInfo',
      component: <ProfileInfo accountInformation={accountInformation} currentUser={currentUser} />
    })
  }

  const handleClickAddressInformation = () => {
    setSwitchContent({
      selected: 'addressInfo',
      component: <AddressInfo currentUser={currentUser} />
    })
  }

  const handleClickChangePasswordInformation = () => {
    setSwitchContent({
      selected: 'changePasswordInfo',
      component: <ChangePassword currentUser={currentUser} />
    })
  }

  const handleClickInvoiceInformation = () => {
    setSwitchContent({
      selected: 'invoiceInfo',
      component: <InvoiceInfo currentUser={currentUser} />
    })
  }
  console.log('accountInformation' + accountInformation)

  return (
    <Fragment>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 ">
              {(accountInformation.userPhoto === 'img.jpg' &&
                <img
                  className="rounded-circle mt-5"
                  width="160px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  alt='Lỗi'
                />
              ) ||
                <>
                  <img
                    className="rounded-circle mt-5"
                    width="160px"
                    src={'/assets/images/avatar/' + accountInformation.userPhoto}
                    style={{width: '10rem', height: '10rem'}}
                    alt={accountInformation.userPhoto}
                  />
                  <br />
                </>
              }

              <b className="font-weight-bold">{accountInformation && (accountInformation.lastname + ' ' + accountInformation.firstname)}</b>
            </div>
            {/* <div className="d-flex flex-column align-items-center"> */}
            <div className="container">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">
                  <div className="card-title-profile" onClick={handleClickAccountInformation}>
                    <i className="fa-sharp fa-solid fa-address-card"></i>{' '}
                    <span >Tài Khoản Của Tôi</span>
                  </div>
                  <div className="container">
                    <div
                      className="card-title-profile"
                      style={(switchContent.selected === 'accountInfo' && { color: "red" }) || {}}
                      onClick={handleClickAccountInformation}
                    >
                      Hồ Sơ
                    </div>
                    <div
                      className="card-title-profile"
                      style={(switchContent.selected === 'addressInfo' && { color: "red" }) || {}}
                      onClick={handleClickAddressInformation}
                    >
                      Địa Chỉ
                    </div>
                    <div
                      className="card-title-profile"
                      style={(switchContent.selected === 'passwordInfo' && { color: "red" }) || {}}
                      onClick={handleClickChangePasswordInformation}
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
                      style={(switchContent.selected === 'invoiceInfo' && { color: "red" }) || {}}
                    >Đơn mua</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">
                  <div className="card-title-profile" onClick={handleClickAccountInformation}>
                    <i className="fa-solid fa-bell"></i>{' '}
                    <span >Thông báo</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">
                  <div className="card-title-profile" onClick={handleClickAccountInformation}>
                    <i className="fa-solid fa-gifts"></i>{' '}
                    <span >Kho voucher</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {switchContent.component}
        </div>
      </div>
    </Fragment >
  )
};

export default AccountInformation;
