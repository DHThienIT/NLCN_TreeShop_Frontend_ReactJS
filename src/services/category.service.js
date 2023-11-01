import axios from "axios";

const API_URL = "http://localhost:8090/api/category/";

const getAllListCategory = () => {
  return axios.get(API_URL + "getAll");
};

const getTreesByCategory = (categoryId) => {
  return axios.get(API_URL + "filterTree/" + categoryId);
};

const CategoryService = {
  getAllListCategory,
  getTreesByCategory
};

export default CategoryService;
