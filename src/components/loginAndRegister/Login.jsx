import React, { useState, useEffect, useRef, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Notification from '../Notification';
import Error from "../../errors/Errors";
// import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";

const { required } = Error

const Login = () => {
  let navigate = useNavigate();
  const form = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState([])

  useEffect(() => {
    let timeoutId = 0
    if (notification.length !== 0) {
      timeoutId = setTimeout(() => {
        if(message!=='Network Error'){
          navigate('/data')
          window.location.reload();
        }
        setNotification([])
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [notification, message, navigate])

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    form.current.validateAll();
    // console.log('--1', username, password)
    if (username && password) {
      AuthService.login(username, password).then(
        () => {
          setNotification(
            <Notification
              pushType='success'
              pushTitle='Thành công'
              pushMessage='Bạn đã đăng nhập thành công.'
            />
          )
        },
        (error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
          console.log(resMessage.toString(), 'Network Error')

          if (resMessage.toString() === 'Network Error') {
            setMessage(resMessage.toString())
            setNotification(
              <Notification
                pushType='danger'
                pushTitle='Lỗi máy chủ'
                pushMessage='Máy chủ hiện tại không phản hồi, xin vui lòng thử lại sau.'
              />
            )
          } else if (resMessage)
            setMessage('Tên đăng nhập hoặc mật khẩu sai')
          else setMessage('')

          setLoading(false);
        }
      );
    } else setLoading(false);
  };

  return (
    <Fragment>
      {/* <button id="success-btn" onClick={() => {
        setContentNotification({ type: 'danger', title: 'Lỗi máy chủ', content: 'Máy chủ hiện tại đã bị ngắt, xin vui lòng thử lại sau.' })
        setOpenNotification(true)
      }}>
        Test
      </button> */}

      <div className="login">
        <div className="wrapper">
          <div className="form-left">
            <p className="text">
              <span>Cây xanh: </span>
              Trồng cây xanh trong nhà hoặc nơi làm việc giúp làm sạch không khí, loại bỏ hóa chất độc hại, cải thiện khả năng ghi nhớ và giảm căng thẳng.
            </p>
            <button
              className="btn btn-success"
              onClick={() => navigate('/register')}
            >
              Tạo tài khoản
            </button>
          </div>
          <Form
            ref={form}
            className="form-right"
            onSubmit={handleLogin}
          >
            <h2 className="text-uppercase">ĐĂNG NHẬP</h2>
            <div className="mb-3">
              <label>Tên đăng nhập</label>
              <Input
                type="text"
                className="input-field"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>
            <div className="mb-3">
              <label>Mật khẩu</label>
              <Input
                type="password"
                className="input-field"
                name="password"
                value={password}
                onChange={onChangePassword}
                onKeyDown={e => e.code === 'Enter' ? handleLogin() : ""}
                validations={[required]}
              />
            </div>
            {/* <div className="mb-3">
              <label className="option">Ghi nhớ mật khẩu
                <input
                  type="checkbox"
                  checked={rememberPassword}
                  onChange={() => (!rememberPassword ? setRememberPassword(true) : setRememberPassword(false))}
                />
                <span className="checkmark"></span>
              </label>
            </div> */}
            <button
              className="btn btn-link btn-sm"
            >
              Quên mật khẩu?
            </button>

            <div className="mb-3">
              <button
                className="btn btn-primary btn-block input-field"
                style={{ color: 'white' }}
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                {" "} <span>Đăng nhập</span>
              </button>
            </div>

            {message && (
              <div className="mb-3 mt-3">
                <div className="alert alert-danger" role="alert">
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

export default Login;
