import React, { useState, useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Error from "../../errors/Errors";
import RootService from "../../services/rootService";
import Notification from "../Notification";
import {
  setUsername,
  setPassword,
  setFirstname,
  setLastname,
  setEmail,
  setCheckPassword,
  setLoading,
  setMessage,
  setNotification,
} from '../../actions/action'

const {
  required,
  validEmail,
  vfirstname,
  vlastname,
  vusername,
  vpassword
} = Error

const Register = () => {
  const form = useRef();
  const inputRef = useRef();
  let navigate = useNavigate();
  const [place, setPlace] = useState('All');
  const { username, password, firstname, lastname, email, loading } = useSelector(state => state.authReducer)
  const { checkPassword } = useSelector(state => state.accountReducer)
  const { message, notification } = useSelector(state => state.mainReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    let timeoutId = 0
    if (notification.length !== 0) {
      timeoutId = setTimeout(() => {
        dispatch(setNotification([]))
        navigate('/login')
        dispatch(setLoading(false));
      }, 4000);
    }

    return () => {
      clearTimeout(timeoutId);
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      dispatch(setCheckPassword(''))
      dispatch(setUsername(''))
      dispatch(setLastname(''))
      dispatch(setEmail(''))
    };
  }, [notification])

  const onChangeUsername = (e) => {
    const username = e.target.value;
    dispatch(setUsername(username));
  };

  const onChangeFirstname = (e) => {
    const firstname = e.target.value;
    dispatch(setFirstname(firstname));
  };

  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    dispatch(setLastname(lastname));
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    dispatch(setEmail(email));
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    dispatch(setPassword(password));
  };

  const onChangeCheckPassword = (e) => {
    const checkPassword = e.target.value;
    dispatch(setCheckPassword(checkPassword));
  };

  const handleRegister = (e) => {
    if (e) e.preventDefault();

    dispatch(setMessage(""));
    dispatch(setLoading(true));
    setPlace('All')

    form.current.validateAll();
    console.log(checkPassword + '-----' + password);
    if (checkPassword === password) {
      RootService.AuthService.register(firstname, lastname, username, email, password)
        .then(
          (response) => {
            dispatch(setNotification(
              <Notification
                pushType='success'
                pushTitle='Thành công'
                pushMessage={response.message}
              />
            ))
          },
          (error) => {
            console.log(error.message)
            const resMessage = (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) ||
              error.message ||
              error.toString();

            if (error.message.toString() === 'Network Error') {
              setPlace('')
              setNotification(
                <Notification
                  pushType='danger'
                  pushTitle='Lỗi máy chủ'
                  pushMessage='Máy chủ hiện tại không phản hồi, xin vui lòng thử lại sau.'
                />
              )
            }
            else if (error.response.data.content === 'Username') setPlace('Username')
            else if (error.response.data.content === 'Email') setPlace('Email')
            dispatch(setLoading(false));
            dispatch(setMessage(resMessage));
          }
        )
    }
    else {
      dispatch(setMessage('Xác nhận mật khẩu và mật khẩu bạn nhập vào không giống nhau!'))
      dispatch(setLoading(false));
    }
  };

  return (
    <Fragment>
      <div className="register">
        <div className="wrapper">
          <div className="form-left">
          </div>
          <Form
            ref={form}
            className="form-right"
            onSubmit={handleRegister}
          >
            <div>
              <h2 className="text-uppercase">ĐĂNG KÝ</h2>
              <div class="row">
                <div class="col-sm-6 mb-3">
                  <label htmlFor="lastname">Họ</label>
                  <Input
                    type="text"
                    className="input-field"
                    name="lastname"
                    value={lastname}
                    onChange={onChangeLastname}
                    validations={[required, vlastname]}
                  />
                </div>
                <div class="col-sm-6 mb-3">
                  <label>Tên</label>
                  <Input
                    type="text"
                    className="input-field"
                    name="firstname"
                    value={firstname}
                    onChange={onChangeFirstname}
                    validations={[required, vfirstname]}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label>Tên đăng nhập</label>
                <Input
                  type="text"
                  className="input-field"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              {message && (place === 'Username') && (
                <div >
                  <div className="alert alert-danger" >
                    {message}
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label>Email</label>
                <Input
                  ref={inputRef}
                  type="text"
                  className="input-field"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              {message && (place === 'Email') && (
                <div >
                  <div className="alert alert-danger" >
                    {message}
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="password">Mật khẩu</label>
                <Input
                  type="password"
                  className="input-field"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Xác nhận mật khẩu</label>
                <Input
                  type="password"
                  className="input-field"
                  name="password"
                  value={checkPassword}
                  onChange={onChangeCheckPassword}
                  validations={[required]}
                />
              </div>
              <div class="mb-3">
                <label class="option">Tôi đồng ý với <a href="#">Các điều khoản và điều kiện</a>
                  <input
                    type="checkbox"
                    checked
                    onChange={() => { }}
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary btn-block input-field"
                  style={{ color: 'white' }}
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  {" "} <span>Đăng Ký</span>
                </button>
              </div>
              <button
                class="btn btn-link btn-sm"
                onClick={() => navigate('/login')}
              >
                Đã có tài khoản? Đăng nhập ngay!
              </button>
            </div>
            {message && (place === 'All') && (
              <div className="mb-3 mt-3">
                <div
                  className="alert alert-danger"
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
      {notification}
    </Fragment >
  );
};

export default Register;
