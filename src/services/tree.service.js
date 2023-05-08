import axios from "axios";

const API_URL = "http://localhost:8090/api/tree/";

const getAllListTree = (page, sortBy) => {
  return axios.get(API_URL + "getAll", {
    params: {
      page: page,
      sortBy: sortBy
    }
  });
};

const getNumberOfTrees = () => {
  return axios.get(API_URL + "getNumberOfTree");
};

const getTree = (treeId) => {
  return axios.get(API_URL + treeId);
};

const TreeService = {
  getAllListTree,
  getTree,
  getNumberOfTrees
};

export default TreeService;
