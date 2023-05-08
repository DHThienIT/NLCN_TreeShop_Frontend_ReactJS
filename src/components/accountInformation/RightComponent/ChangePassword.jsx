import { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../../errors/Errors"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Notification from "../../Notification";
import UserService from "../../../services/user.service";
import AuthService from "../../../services/auth.service";
import EventBus from "../../../common/EventBus";

const { required, vpassword } = Error

const ChangePassword = ({ accountInformation, currentUser }) => {
  // console.log(accountInformation, currentUser)
  const timeLogoutAfterChangePasswordSuccess = 5000

  const form = useRef();
  let navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');
  const [notification, setNotification] = useState([])
  const [message, setMessage] = useState({
    place: '',
    content: ''
  })

  // useEffect(() => {
  //   EventBus.on("logout", () => {
  //     logOut();
  //   });

  //   return () => {
  //     EventBus.remove("logout");
  //   };
  // }, []);

  const logOut = () => {
    AuthService.logout();
    navigate('/login')
    window.location.reload()
  };

  const handleSubmitForm = (e) => {
    setMessage('')
    e.preventDefault();
    form.current.validateAll();

    if (oldPassword && newPassword && checkNewPassword) {
      if (newPassword === checkNewPassword) {
        UserService.updatePassword(currentUser.id, oldPassword, newPassword).then(
          (response) => {
            if (response.data.content === 'WrongPass') {
              setMessage({
                place: 'Old',
                content: response.data.message
              })
            } else {
              setNotification(
                <Notification
                  pushType='success'
                  pushTitle='Thay đổi mật khẩu thành công'
                  pushMessage='Đã thay đổi mật khẩu của người dùng.'
                  countDown={timeLogoutAfterChangePasswordSuccess}
                />
              )

              setTimeout(() => {
                setNotification([])
                logOut()
              }, timeLogoutAfterChangePasswordSuccess);
            }
          }
        )
      } else {
        setMessage({
          place: 'All',
          content: 'Mật khẩu mới và xác nhận mật khẩu mới phải giống nhau!'
        })
      }
    }
  }

  return (
    <Fragment>
      <div className="col-md-2"></div>
      <Form
        ref={form}
        className="col-md-5 border-right"
        onSubmit={handleSubmitForm}
      ><br /><br />
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Thay đổi mật khẩu</h4>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Mật khẩu cũ</label>
              <Input
                type="password"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                validations={[required, vpassword]}
                placeholder='Nhập mật khẩu cũ...'
              />
            </div>
          </div>
          {message.place === 'Old' && (
            <div className="mb-3 mt-3">
              <div className="alert alert-danger" role="alert">
                {message.content}
              </div>
            </div>
          )}
          <br />
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Mật khẩu mới</label>
              <Input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                validations={[required, vpassword]}
                placeholder='Nhập mật khẩu mới...'
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Xác nhận mật khẩu mới</label>
              <Input
                type="password"
                className="form-control"
                value={checkNewPassword}
                onChange={(e) => setCheckNewPassword(e.target.value)}
                onKeyDown={e => e.code === 'Enter' ? handleSubmitForm() : ""}
                validations={[required, vpassword]}
                placeholder='Nhập lại mật khẩu mới...'
              />
            </div>
          </div>
          {message.place === 'All' && (
            <div className="mb-3 mt-3">
              <div className="alert alert-danger" role="alert">
                {message.content}
              </div>
            </div>
          )}
          <div className="mt-5 d-flex justify-content-evenly">
            <button
              className="btn btn-my-page"
            >
              Lưu
            </button>
          </div>
        </div>
      </Form>
      {notification}
    </Fragment>
  );
}

export default ChangePassword;