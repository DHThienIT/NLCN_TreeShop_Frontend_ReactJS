import React from "react";
import isEmail from "validator/lib/isEmail";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Ô này không được để trống!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Định dạng Email không chính xác.
            </div>
        );
    }
};

const vfirstname = (value) => {
    if (value.length < 2 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Tên phải từ 2 đến 15 ký tự.
            </div>
        );
    }
};

const vlastname = (value) => {
    if (value.length < 2 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Họ phải từ 2 đến 15 ký tự.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 10) {
        return (
            <div className="alert alert-danger" role="alert">
                Tên đăng nhập phải từ 3 đến 10 ký tự.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Mật khẩu phải dài từ 6 đến 40 ký tự.
            </div>
        );
    }
};

const vphone = (value) => {
    if (value) {
        if (value.length < 10 && value.length !== 0) {
            return (
                <div className="alert alert-danger" role="alert">
                    Số điện thoại phải gồm 10 chữ số.
                </div>
            );
        } else if (value.length > 10) {
            return (
                <div className="alert alert-danger" role="alert">
                    Số điện thoại chỉ được 10 chữ số.
                </div>
            );
        }
    }
};

const vfullName = (value) => {
    let string = value.split(' ')
    // console.log('value', string, string[string.length - 1])
    if (string.length === 1 || (string.length === 2 && string[string.length - 1] === '')) {
        return (
            <div className="alert alert-danger" role="alert">
                Họ và tên người nhận chưa đúng định dạng.
            </div>
        );
    }
};

const errorRegister = {
    required,
    validEmail,
    vfirstname,
    vlastname,
    vusername,
    vpassword,
    vphone,
    vfullName
}

export default errorRegister;