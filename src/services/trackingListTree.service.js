import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8090/api/user/trackingListTree";

const getTrackingListTreeByUserId = (userId) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.get(API_URL + '/' + userId);
};

const updateTreeInTrackingList = async (user_id, tree_id) => {
  axios.defaults.headers.common["Authorization"] = authHeader() ? `Bearer ${authHeader()}` : null;
  return axios.put(API_URL, {
    user_id,
    tree_id,
  }).then((response) => {
    return response;
  });
};

const TrackingListTreeService = {
  getTrackingListTreeByUserId,
  updateTreeInTrackingList
};

export default TrackingListTreeService;
