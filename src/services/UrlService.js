import axios from "axios";

const getInfoFromUrl = url => axios.get(`api/plans/url-info?url=${url}`);

export default {
  getInfoFromUrl
};
