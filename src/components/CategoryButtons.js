import React from "react";
import Button from "@material-ui/core/Button";

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  > button {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;

const CategoryButtons = ({ handleChangeCategory, category }) => {
  return (
    <Button
      variant={category === "Fitness" ? "contained" : "outlined"}
      color="primary"
      size="small"
      startIcon={category[1]}
      onClick={e => handleChangeCategory(e, "Fitness")}
    >
      Fitness
    </Button>
  );
};

export default CategoryButtons;
