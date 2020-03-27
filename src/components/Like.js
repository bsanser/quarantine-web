import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const StyledFavoriteIcon = styled(FavoriteIcon)`
  color: ${({ isLiked }) => (isLiked ? "red" : "grey")};
`;
const Like = ({ totalLikes, isLiked, handleLike }) => {
  return (
    <>
      <span>{totalLikes}</span>
      <IconButton aria-label="add to favorites" onClick={handleLike}>
        <StyledFavoriteIcon isLiked={isLiked} />
      </IconButton>
    </>
  );
};

export default Like;
