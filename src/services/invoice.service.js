import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/invoice/";

const createInvoice = async (user_id, address_id, shipmentFee, promotionPrice) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  console.log(user_id)
  return axios.post(API_URL + 'create', {
    user_id,
    address_id,
    shipmentFee,
    promotionPrice
  }).then(
    (response) => {
      return response.data;
    }
  );
};

const getAllInvoicesPaySuccessByUser = (userId) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.get(API_URL + 'getAllInvoicesPaySuccessByUser/' + userId).then(
    (response) => {
      return response.data;
    }
  );
};

const InvoiceService = {
  createInvoice,
  getAllInvoicesPaySuccessByUser
};

export default InvoiceService;
