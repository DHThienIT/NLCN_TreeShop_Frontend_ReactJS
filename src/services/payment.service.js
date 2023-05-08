import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/payment/";

const pay = async (invoiceId, user_id, paymentMethod) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  // console.log(user_id)
  return axios.post(API_URL + 'pay/' + invoiceId, {
    user_id,
    paymentMethod
  }).then(
    (response) => {
      return response.data;
    }
  );
};

const PaymentService = {
  pay
};

export default PaymentService;
