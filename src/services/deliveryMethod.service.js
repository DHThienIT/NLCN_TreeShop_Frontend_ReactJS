import axios from "axios";

const API_URL = "http://localhost:8090/api/deliveryMethod/";

const getAllDeliveryMethod = () => {
  return axios.get(API_URL + 'getAll').then(
    (response) => {
      return response.data;
    });
}

const DeliveryMethodService = {
  getAllDeliveryMethod
};

export default DeliveryMethodService;
