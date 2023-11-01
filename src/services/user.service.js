import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/user/";

// Lấy token từ localStorage (nếu có)
// const user = JSON.parse(localStorage.getItem("user"));
// const token = user ? user.accessToken : null;

const getUserInfo = (userId) => {
  // Đặt Authorization header với authHeader() nếu có
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;

  return axios.get(API_URL + userId)
};

const updateUserInformation = async (userId, firstname, lastname, phone, email) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;

  return axios.put(API_URL + 'updateUserInformation/' + userId, {
    firstname,
    lastname,
    phone,
    email
  }).then((response) => {
    return response;
  });
};

const updatePassword = async (userId, oldPassword, newPassword) => {
  // console.log(userId, oldPassword, newPassword)
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;

  return axios.put(API_URL + 'updatePassword/' + userId, {
    oldPassword,
    newPassword
  }).then((response) => {
    return response;
  });
};

const UserService = {
  getUserInfo,
  updateUserInformation,
  updatePassword
};

export default UserService;
