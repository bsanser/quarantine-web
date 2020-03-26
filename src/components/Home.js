import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import PlansList from "./PlansList";
import PlansService from "./../services/PlansService";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FormDialog from "./Dialog";
import FiltersList from "./FiltersList";
import { formatToISO } from "./../utils/date-utils";

const fabStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed"
};

const Home = () => {
  console.log(formatToISO(new Date())); //2020-03-26T13:45:56Z
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [todayFilter, setTodayFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  const handleFilterByToday = () =>
    todayFilter === "all"
      ? setTodayFilter(formatToISO(new Date()))
      : setTodayFilter("all");

  const handleApplyFilter = event => {
    const { name, value } = event.target;
    // eslint-disable-next-line default-case
    switch (name) {
      case "category":
        setCategoryFilter(value);
        break;
      case "language":
        setLanguageFilter(value);
        break;
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchPlans = () => {
      PlansService.getPlans({
        date: todayFilter,
        category: categoryFilter.toLowerCase(),
        language: languageFilter
      }).then(response => {
        setPlans(response.data);
      });
    };
    fetchPlans();
  }, [categoryFilter, todayFilter, languageFilter]);

  return (
    <div className="Home">
      <FiltersList
        handleApplyFilter={handleApplyFilter}
        handleFilterByToday={handleFilterByToday}
        category={categoryFilter}
        language={languageFilter}
        today={todayFilter}
      ></FiltersList>
      <PlansList plans={plans} />
      <Fab color="primary" aria-label="add" style={fabStyle}>
        <AddIcon onClick={() => setModalOpen(true)} />
      </Fab>
      <FormDialog
        handleClose={handleCloseModal}
        open={isModalOpen}
      ></FormDialog>
    </div>
  );
};

export default withRouter(Home);
