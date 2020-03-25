import http from "./BaseService";

const getPlans = () => http.get("/plans");
const getPlansByCategory = category => http.get(`/plans/category?category=${category}`);
const createPlan = plan => http.post("/plans", plan);

export default {
  getPlans,
  getPlansByCategory,
  createPlan
};
