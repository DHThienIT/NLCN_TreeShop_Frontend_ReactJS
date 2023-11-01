import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/cart/";

const getListCartItem = (userId) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.get(API_URL + "getCart/" + userId)
};

const addTreeToCart = async (tree_id, user_id, quantity) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.post(API_URL, {
    tree_id,
    user_id,
    quantity
  }).then(
    (response) => {
      // console.log('1111111111111111111111111111111111111111111:  ', response);
      return response.data;
    });
}

const updateTreeInCart = async (user_id, cartItemTreeId, quantity) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.put(API_URL + cartItemTreeId, {
    user_id,
    quantity
  })
}

const CartService = {
  getListCartItem,
  addTreeToCart,
  updateTreeInCart
};

export default CartService;
