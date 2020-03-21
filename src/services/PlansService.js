import http from "./BaseService";

console.log("entro en el servicio de los planes");
const getPlans = () => http.get("/plans");

// const followPlan = planId => http.post(`/tweets/${planId}/follow`, {});

export default {
  getPlans
};
