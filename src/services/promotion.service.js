import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/promotion/";

const checkPromotionCode = async (code) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.post(API_URL + 'checkPromotionCode', {
    code
  }).then(
    (response) => {
      return response.data;
    });
}

const PromotionService = {
  checkPromotionCode
};

export default PromotionService;
