import http from "./BaseService";

const getPlans = ({ date, category, language }) =>
  http.get(`/plans?date=${date}&category=${category}&language=${language}`);

const getPlan = planId => http.get(`/plans/${planId}`);

const createPlan = plan => http.post("/plans", plan);

const likePlan = planId => http.post(`/plans/${planId}/like`, {});

const getTotalLikes = planId => http.get(`/plans/${planId}/total-likes`);

const getUserLikedPlan = planId => http.get(`/plans/${planId}/is-liked`);

export default {
  getPlans,
  getPlan,
  createPlan,
  likePlan,
  getTotalLikes,
  getUserLikedPlan
};
