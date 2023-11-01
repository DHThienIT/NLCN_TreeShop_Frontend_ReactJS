import React, { useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Notification from '../Notification';
import Error from "../../errors/Errors";
import RootService from "../../services/rootService";
import { setUsername, setPassword, setLoading, setMessage, setNotification } from '../../actions/action'

const { required } = Error

const Login = () => {
  let navigate = useNavigate();
  const form = useRef();
  const { username, password, loading } = useSelector(state => state.authReducer)
  const { notification } = useSelector(state => state.mainReducer)
  const { message } = useSelector(state => state.mainReducer)
  const dispatch = useDispatch()

  // console.log('--------loading: ', loading);

  useEffect(() => {
    // let timeoutId = 0
    // if (notification.length !== 0) {
    //   timeoutId = setTimeout(() => {
    //     if (message !== 'Network Error') {
    //       navigate('/data')
    //       window.location.reload()
    //     }
    //     dispatch(setNotification([]));
    //   }, 3000);
    // }

    return () => {
      // clearTimeout(timeoutId);
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    };
  }, [notification, message])

  const onChangeUsername = (e) => {
    const username = e.target.value;
    dispatch(setUsername(username));
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    dispatch(setPassword(password));
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    dispatch(setMessage(''));
    dispatch(setLoading(true));

    form.current.validateAll();
    if (username && password) {
      RootService.AuthService.login(username, password).then(
        (response) => {
          // dispatch(
          //   setNotification(
          //     <Notification
          //       pushType='success'
          //       pushTitle='Thành công'
          //       pushMessage='Bạn đã đăng nhập thành công.'
          //     />
          //   )
          // )
          navigate('/data')
          window.location.reload()
        },
        (error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
          console.log(resMessage.toString(), 'Network Error')

          if (resMessage.toString() === 'Network Error') {
            dispatch(setMessage(resMessage.toString()))
            dispatch(setNotification(
              <Notification
                pushType='danger'
                pushTitle='Lỗi máy chủ'
                pushMessage='Máy chủ hiện tại không phản hồi, xin vui lòng thử lại sau.'
              />
            ))
          } else if (resMessage) {
            dispatch(setMessage('Tên đăng nhập hoặc mật khẩu sai'))
            dispatch(setPassword(''))
          } else dispatch(setMessage(''))

          dispatch(setLoading(false));
        }
      );
    } else dispatch(setLoading(false));
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
                className="form-control"
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
