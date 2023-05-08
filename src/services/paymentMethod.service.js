import axios from "axios";

const API_URL = "http://localhost:8090/api/payment/";

const getAllPaymentMethod = () => {
  return axios.get(API_URL + 'getAllPaymentMethod').then(
    (response) => {
      return response.data;
    });
}

const PaymentMethodService = {
  getAllPaymentMethod
};

export default PaymentMethodService;
