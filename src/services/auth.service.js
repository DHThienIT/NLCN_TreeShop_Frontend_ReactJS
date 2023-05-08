import axios from "axios";

const API_URL = "http://localhost:8090/api/auth/";

const register = async (firstname, lastname, username, email, password) => {
  try {
    const response = await axios.post(API_URL + "signup", {
      firstname,
      lastname,
      username,
      email,
      password,
    });
    // Xử lý dữ liệu trả về nếu cần
    console.log(response)
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    if (error.response) {
      // Nếu có phản hồi từ máy chủ (server) với mã lỗi HTTP
      console.log("Lỗi HTTP:", error.response.status);
      console.log("Thông điệp lỗi:", error.response.data);
    } else if (error.request) {
      // Nếu không có phản hồi từ máy chủ (server)
      console.log("Không có phản hồi từ máy chủ:", error.request);
    } else {
      // Nếu có lỗi trong quá trình gửi yêu cầu
      console.log("Lỗi gửi yêu cầu:", error.message);
    }
    // Ném lại lỗi để xử lý tiếp hoặc hiển thị cho người dùng
    throw error;
  }
};

const login = async (username, password) => {
  return axios.post(API_URL + "signin", {
    username,
    password,
  }).then((response) => {
    if (response.data.accessToken) {
      // Lưu trữ token vào localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      // Đặt Authorization header với token trong tất cả các yêu cầu tiếp theo
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
    }
    console.log(response.data)
    // document.cookie = response.headers['set-cookie'];
    return response.data;
  });
}

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;