import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/address/";

const getAllAddressInfo = (userId) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.get(API_URL + 'getAllAddressByUser/' + userId)
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

const setDefaultAddress = async (addressIdWasSetDefault, addressIdWillSetDefault) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.put(API_URL + 'setDefaultAddress', {
    addressIdWasSetDefault,
    addressIdWillSetDefault
  }).then((response) => {
    // console.log('response', response)
    return response;
  });
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

const deleteAddress = async (addressId) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.delete(API_URL + addressId).then(
    (response) => {
      console.log('response', response)
      return response;
    });
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
