import { Fragment, useState, useRef, useEffect } from "react";
import Error from "../../../errors/Errors"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Notification from "../../Notification";
import UserService from "../../../services/user.service";

const { required, validEmail, vfirstname, vlastname, vphone } = Error

const ProfileInfo = ({ accountInformation, currentUser }) => {
  // console.log('accountInformation', accountInformation, currentUser)
  const form = useRef();
  const [firstname, setFirstname] = useState(accountInformation.firstname);
  const [lastname, setLastname] = useState(accountInformation.lastname);
  const [phone, setPhone] = useState(accountInformation.phone);
  const [email, setEmail] = useState(accountInformation.email);
  // const [listAddresses, setListAddresses] = useState([]);
  const [allowEdit, setAllowEdit] = useState(false);
  const [notification, setNotification] = useState([])
  const [fileAvatar, setFileAvatar] = useState()
  const [avatarName, setAvatarName] = useState()
  const [avatar, setAvatar] = useState()

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview)     //Xóa avatar.preview được lưu tạm thời vào bộ nhớ trình duyệt
    }
  }, [avatar])

  const handleSubmitForm = (e) => {
    e.preventDefault();

    form.current.validateAll();
    let phoneNumber = phone
    if (!phoneNumber) phoneNumber = 'none';
    UserService.updateUserInformation(currentUser.id, firstname, lastname, phoneNumber, email).then(
      (response) => {
        handleAllowEdit()
        console.log('SUCCESS', response)
        setNotification(
          <Notification
            pushType='success'
            pushTitle='Thành công'
            pushMessage='Đã cập nhật thông tin tài khoản người dùng.'
          />
        )

        setTimeout(() => {
          setNotification([])
          window.location.reload()
        }, 4000);
      }
    )
  }

  const handleAllowEdit = () => {
    setAllowEdit(!allowEdit)
  }

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0]              //Lấy ra file đã chọn
    const filePath = e.target.value

    setFileAvatar(file)
    setAvatarName(filePath.substring(filePath.lastIndexOf('\\')+1))
    file.preview = URL.createObjectURL(file)    //Lưu file đó tạm thời vào bộ nhớ trình duyệt => sinh ra địa chỉ ảnh. VD: http://localhost:3000/f0e1ce30-99dd-4e
    // console.log(file.preview)
    setAvatar(file)
  }

  const handleSaveAvatar = () => {
    // console.log('fileAvatar' + fileAvatar)
    const formData = new FormData();
    formData.append("file", fileAvatar);

    // console.log(formData)
    
    UserService.updateUserAvatar(currentUser.id, formData).then(
      (response) => {
        console.log('SUCCESS', response)
        setNotification(
          <Notification
            pushType='success'
            pushTitle='Thành công'
            pushMessage='Đã cập nhật ảnh đại diện thành công.'
          />
        )

        setTimeout(() => {
          setNotification([])
          window.location.reload()
        }, 4000);
      }
    )
  }

  return (
    <Fragment>
      <Form
        ref={form}
        className="col-md-5 border-right"
        onSubmit={handleSubmitForm}
      >
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Thông tin người dùng</h4>
            {!allowEdit && (
              <button
                className="btn btn-my-page"
                onClick={handleAllowEdit}
              >
                Chỉnh sửa
              </button>
            )}
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Tên đăng nhập</label>
              <Input
                type="text"
                className="form-control"
                value={accountInformation.username}
                disabled={true}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <label className="labels">Họ<span className="text-input-required">*</span></label>
              <Input
                type="text"
                className="form-control"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Nhập họ..."
                validations={[required, vlastname]}
                disabled={!allowEdit}
              />
            </div>
            <div className="col-md-6">
              <label className="labels">Tên<span className="text-input-required">*</span></label>
              <Input
                type="text"
                className="form-control"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Nhập tên..."
                validations={[required, vfirstname]}
                disabled={!allowEdit}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Số điện thoại (+84)</label>
              <Input
                type="number"
                className="form-control"
                value={phone === 'none' ? '' : phone}
                onChange={(e) => { setPhone(e.target.value) }}
                placeholder="Chưa nhập số điện thoại..."
                validations={[vphone]}
                disabled={!allowEdit}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Email<span className="text-input-required">*</span></label>
              <Input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Chưa nhập số điện thoại..."
                validations={[required, validEmail]}
                disabled={!allowEdit}
              />
            </div>
          </div>
          {allowEdit && (
            <div className="mt-5 d-flex justify-content-evenly">
              <button
                className="btn btn-my-page"
              >
                Lưu thông tin
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleAllowEdit}
              >
                Hủy chỉnh sửa
              </button>
            </div>
          )}
        </div>
      </Form>
      <div className="col-md-4">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center experience">
            <h4 className="text-right">Cập nhật ảnh đại diện</h4>
          </div>
          <br />
          <div className="col-md-12 text-center">
            {/* <label className="labels">Tài khoản có quyền</label>
            <input type="text" className="form-control" placeholder="thêm thông tin bản thân" value="" disabled={true} /> */}
            <label className="file-upload btn btn-my-page">
              <input
                type="file"
                accept="image/*"
                onChange={handlePreviewAvatar}
              />
            </label>
            <br /><br />

            {(avatar &&
              <div
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  src={avatar.preview}
                  alt=''
                  width='70%'
                />
              </div>
            ) || (
              <div className="border-preview-pic d-flex d-flex justify-content-center align-items-center">
                <h5>Ảnh đưa vào nên là hình vuông...</h5>
              </div>
            )}

            <br />
            {avatar &&
              <div>
                <button
                  className="btn btn-my-page"
                  onClick={handleSaveAvatar}
                >
                  Lưu
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setAvatar()}
                >
                  Hủy
                </button>
              </div>
            }
          </div>
        </div>
      </div>
      {notification}
    </Fragment >
  );
}

export default ProfileInfo;