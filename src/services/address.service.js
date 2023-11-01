import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/address/";

const getAllAddressInfo = (user_id) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.get(API_URL + 'getAllAddressByUser/' + user_id)
};

const getOneAddress = (addressId) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.get(API_URL + addressId)
};

const getAllProvinceAndCity = () => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.get(API_URL + 'provinceAndCity')
};

const getAllCountryAndDistrict = () => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.get(API_URL + 'countryAndDistrict')
};

const getAllWards = () => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.get(API_URL + 'wards')
};

const setDefaultAddress = async (user_id, addressIdWasSetDefault, addressIdWillSetDefault) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.put(API_URL + 'setDefaultAddress', {
    user_id,
    addressIdWasSetDefault,
    addressIdWillSetDefault
  })
};

const createNewAddress = async (user_id, recipientName, phone, provinceAndCity_id, countryAndDistrict_id, ward_id, specificAddress, setDefault) => {
  console.log(user_id, recipientName, phone, provinceAndCity_id, countryAndDistrict_id, ward_id, specificAddress, setDefault)
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.post(API_URL + 'create', {
    user_id,
    recipientName,
    phone,
    provinceAndCity_id,
    countryAndDistrict_id,
    ward_id,
    specificAddress,
    setDefault
  }).then(
    (response) => {
      return response.data;
    }
  );
};

const updateAddress = async (addressId, user_id, recipientName, phone, provinceAndCity_id, countryAndDistrict_id, ward_id, specificAddress, setDefault) => {
  console.log(addressId, user_id, recipientName, phone, provinceAndCity_id, countryAndDistrict_id, ward_id, specificAddress, setDefault)
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.put(API_URL + addressId, {
    user_id,
    recipientName,
    phone,
    provinceAndCity_id,
    countryAndDistrict_id,
    ward_id,
    specificAddress,
    setDefault
  }).then(
    (response) => {
      return response.data;
    }
  );
};

const deleteAddress = async (user_id, addressId) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.delete(API_URL + addressId, {
    user_id
  })
};

const AddressService = {
  getAllAddressInfo,
  getOneAddress,
  setDefaultAddress,
  getAllProvinceAndCity,
  getAllCountryAndDistrict,
  getAllWards,
  createNewAddress,
  updateAddress,
  deleteAddress
};

export default AddressService;
