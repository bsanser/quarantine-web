import axios from "axios";

const getPlans = ({ from, to, category, language }) =>
  axios.get("/api/plans", {
    params: { from, to, category, language },
  });

const getAllPlans = ({ category, language, from, to }) =>
  axios.get("/api/plans/all", {
    params: { category, language, from, to },
  });

const getLikedPlans = () => axios.get("/api/plans/liked");

const getPlan = (planId) => axios.get(`/api/plans/${planId}`);

const createPlan = (plan) => axios.post("/api/plans", plan);

const likePlan = (planId) => axios.post(`/api/plans/${planId}/like`, {});

const getTotalLikes = (planId) => axios.get(`/api/plans/${planId}/total-likes`);

const getUserLikedPlan = (planId) => axios.get(`/api/plans/${planId}/is-liked`);

export default {
  getPlans,
  getAllPlans,
  getLikedPlans,
  getPlan,
  createPlan,
  likePlan,
  getTotalLikes,
  getUserLikedPlan,
};
