import axios from "axios";

const getPlans = ({ date, category, language }) =>
  axios.get(`api/plans?date=${date}&category=${category}&language=${language}`);

const getPlan = planId => axios.get(`/api/plans/${planId}`);

const createPlan = plan => axios.post("/api/plans", plan);

const likePlan = planId => axios.post(`/api/plans/${planId}/like`, {});

const getTotalLikes = planId => axios.get(`/api/plans/${planId}/total-likes`);

const getUserLikedPlan = planId => axios.get(`/api/plans/${planId}/is-liked`);

export default {
  getPlans,
  getPlan,
  createPlan,
  likePlan,
  getTotalLikes,
  getUserLikedPlan
};
