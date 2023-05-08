import axios from "axios";

const API_URL = "http://localhost:8090/api/search/";

const searchTreesByText = (filterName) => {
  return axios.post(API_URL + filterName);
};

const searchTreesByMaxMinPrice = async (min, max) => {
  // console.log('11111111111')
  return axios.post(API_URL + "filterByMaxMinPrice", {
    min,
    max
  });
};

const searchTreesByColor = async (listEColor) => {
  return axios.post(API_URL + "filterByTreeColor", {
    listColor: listEColor
  });
};

const TreeSearchService = {
  searchTreesByText,
  searchTreesByMaxMinPrice,
  searchTreesByColor
};

export default TreeSearchService;
