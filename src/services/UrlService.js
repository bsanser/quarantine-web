import http from "./BaseService";

const getInfoFromUrl = url => http.get(`plans/url-info?url=${url}`);

export default {
  getInfoFromUrl
};
