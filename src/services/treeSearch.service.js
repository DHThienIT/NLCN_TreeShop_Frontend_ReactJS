import axios from "axios";

const API_URL = "http://localhost:8090/api/search/";

const getPriceList = () => {
  return axios.get(API_URL + "getPriceList");
};

const getColorList = () => {
  return axios.get(API_URL + "getColorList");
};

const searchTreesByText = (filterName) => {
  return axios.post(API_URL + filterName);
};

const searchTreesByMaxMinPrice = async (page, sortBy, filterBy, min, max) => {
  // console.log('11111111111-', page, sortBy, filterBy, min, max)
  return axios.post(API_URL + "filterByMaxMinPrice", {
    page,
    sortBy,
    filterBy,
    min,
    max
  });
};

const searchTreesByColor = async (page, sortBy, filterBy, listColorId) => {
  // console.log(page + '-' + sortBy + '-' + filterBy + '-' + listColorId);
  return axios.post(API_URL + "filterByTreeColor", {
    page,
    sortBy,
    filterBy,
    listColorId
  });
};

const TreeSearchService = {
  getPriceList,
  getColorList,
  searchTreesByText,
  searchTreesByMaxMinPrice,
  searchTreesByColor
};

export default TreeSearchService;
