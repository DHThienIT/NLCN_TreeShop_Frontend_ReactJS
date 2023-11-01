import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/image/";

const getTreeImage = (treeId) => {
  return axios.get(API_URL + 'getTreeImage/' + treeId, { responseType: 'arraybuffer' }).then(
    (response) => {
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      return url;
    }
  ).catch(error => console.log(error));;
};

const getAvatarImage = (userId) => {
  return axios.get(API_URL + 'getAvatarImage/' + userId, { responseType: 'arraybuffer' }).then(
    (response) => {
      // console.log(response);
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      return url;
    }
  ).catch(error => console.log(error))
};

const updateUserAvatar = async (userId, formData) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;

  return axios.post(API_URL + 'updateUserAvatar/' + userId, formData).then(
    (response) => {
      // console.log(response);
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      return url;
    }).catch(error => console.log(error))
};

const ImageService = {
  getTreeImage,
  getAvatarImage,
  updateUserAvatar
};

export default ImageService;
