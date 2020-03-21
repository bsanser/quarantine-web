import http from "./BaseService";

const getPlans = () => http.get("/plans");
const createPlan = plan => http.post("/plans", plan);

export default {
  getPlans,
  createPlan
};
