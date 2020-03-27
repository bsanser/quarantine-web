import http from "./BaseService";

const logout = () => http.delete("/sessions");
const register = data => http.post("/users", data);
const getCurrentUser = () => http.get("/current_user");

export default {
  logout,
  register,
  getCurrentUser
};
