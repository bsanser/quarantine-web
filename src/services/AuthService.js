import http from "./BaseService";

const login = ({ email, password }) => http.post("/sessions", { email, password });

const logout = () => http.delete("/sessions");

const register = data => http.post("/users", data);

export default {
  login,
  logout,
  register
};
