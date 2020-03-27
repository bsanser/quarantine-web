import http from "./BaseService";

const getPlans = ({date,category,language}) =>  http.get(`/plans?date=${date}&category=${category}&language=${language}`);

const createPlan = plan => http.post("/plans", plan);

const likePlan = planId => http.post(`/plans/${planId}/like`, {});

export default {
  getPlans,
  createPlan,
  likePlan
};
