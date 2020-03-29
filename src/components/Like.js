import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const StyledFavoriteIcon = styled(FavoriteIcon)`
  color: ${({ liked }) => (liked === "true" ? "red" : "grey")};
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  > button {
    padding-left: 4px;
  }
  > span {
    font-weight: bold;
  }
`;

const Like = ({ totalLikes, isLiked, handleLike }) => {
  return (
    <LikeWrapper>
      <span>{totalLikes}</span>
      <IconButton aria-label="add to favorites" onClick={handleLike}>
        <StyledFavoriteIcon liked={isLiked.toString()} />
      </IconButton>
    </LikeWrapper>
  );
};

export default Like;
