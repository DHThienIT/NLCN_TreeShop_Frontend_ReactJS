import { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../../errors/Errors"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Notification from "../../Notification";
import RootService from "../../../services/rootService";
import { useDispatch, useSelector } from "react-redux";
import { setCheckPassword, setNewPassword, setPassword } from "../../../actions/action";

const { required, vpassword } = Error

const ChangePassword = () => {
  const form = useRef();
  let navigate = useNavigate();
  const timeLogoutAfterChangePasswordSuccess = 5000
  const { currentUser, newPassword, checkPassword } = useSelector(state => state.accountReducer)
  const { password } = useSelector(state => state.authReducer)
  const dispatch = useDispatch()

  const [notification, setNotification] = useState([])
  const [message, setMessage] = useState({
    place: '',
    content: ''
  })

  useEffect(() => {
    return () => {
      dispatch(setPassword(''))
      dispatch(setNewPassword(''))
      dispatch(setCheckPassword(''))
    }
  }, [])

  const logOut = () => {
    RootService.AuthService.logout();
    navigate('/login')
    window.location.reload()
  };

  const handleSubmitForm = (e) => {
    setMessage('')
    e.preventDefault();
    form.current.validateAll();

    if (password && newPassword && checkPassword) {
      if (password === newPassword) {
        setMessage({
          place: 'All',
          content: 'Mật khẩu mới bạn nhập vào không được giống với mật khẩu cũ!'
        })
      } else if (newPassword === checkPassword) {
        RootService.UserService.updatePassword(currentUser.id, password, newPassword).then(
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
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
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
                onChange={(e) => dispatch(setNewPassword(e.target.value))}
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
                value={checkPassword}
                onChange={(e) => dispatch(setCheckPassword(e.target.value))}
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