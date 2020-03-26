import http from "./BaseService";

const loginWithGoogle = () => http.get('/auth/google');
const logout = () => http.delete("/sessions");
const register = data => http.post("/users", data);

export default {
  loginWithGoogle,
  logout,
  register
};
