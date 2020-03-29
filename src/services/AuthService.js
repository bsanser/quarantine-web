import axios from "axios";

const logout = () => axios.get("api/logout");
const register = data => axios.post("api/users", data);
const getCurrentUser = () => axios.get("api/current_user");

export default {
  logout,
  register,
  getCurrentUser
};
