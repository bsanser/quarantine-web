import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import PlansList from "./PlansList";
import PlansService from "./../services/PlansService";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FormDialog from "./Dialog";
import FiltersList from "./FiltersList";

const fabStyle = {
  right: 20,
  bottom: 20,
  position: "fixed"
};

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [todayFilter, setTodayFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  const handleFilterByToday = () => {
    setTodayFilter(!todayFilter);
  };
  const handleApplyFilter = event => {
    const name = event.target.name;
    const value = event.target.value;
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
      if (
        !todayFilter &&
        categoryFilter === "all" &&
        languageFilter === "all"
      ) {
        PlansService.getPlans().then(response => setPlans(response.data));
        return;
      }
      if (categoryFilter !== "all") {
        PlansService.getPlansByCategory(categoryFilter.toLowerCase()).then(response => {
          console.log(response.data)
          setPlans(response.data)
        }
         
        );
      
        return;
      }
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
