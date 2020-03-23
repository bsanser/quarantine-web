import React, { useState, useCallback } from "react";
import { device } from "./../styles/breakpoints";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import DatePicker from "./DatePicker";
import Button from "@material-ui/core/Button";
import categories from "./../constants/categories";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";

import languages from "./../constants/languages";

const Container = styled.div`
  height: 100vh;
  padding: 32px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media ${device.tablet} {
    width: 400px;
    padding: 20px;
  }
  @media ${device.desktop} {
    width: 400px;
    padding: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: white;
  margin: 0 auto;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  > button {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;

const DateWrapper = styled.div`
  margin-bottom: 16px;
  > div {
    width: 100%;
  }
`;

const LinkWrapper = styled.div`
  margin-bottom: 16px;
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  > div {
    margin-right: 10px;
  }
`;
const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    marginBottom: "16px"
  }
}));

const StyledInputLabel = styled(InputLabel)`
  margin-bottom: 10px;
`;

const PlansForm = props => {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [link, setLink] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [category, setCategory] = useState(null);
  const [language, setLanguage] = React.useState("");


  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };
  const handleChangeLink = event => {
    setLink(event.target.value);
  };
  const handleChangeDate = value => {
    setDate(value);
  };

  const handleChangeCategory = (event, category) => {
    console.log(category);
    setCategory(category);
  };

  const handleChangeLanguage = event => {
    setLanguage(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log({ date, title, description, link, category, language });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextField
          id="title"
          label="Title"
          name="title"
          value={title}
          onChange={handleChangeTitle}
          required
        />
        <TextField
          name="description"
          id="description"
          label="Description"
          value={description}
          onChange={handleChangeDescription}
          multiline
        />
        <LinkWrapper>
          <TextField
            name="link"
            id="link"
            label="Link"
            value={link}
            onChange={handleChangeLink}
            required
          />
        </LinkWrapper>

        <DateWrapper>
          <DatePicker date={date} handleChangeDate={handleChangeDate} />
        </DateWrapper>
        <StyledInputLabel>Category*</StyledInputLabel>
        <CategoriesWrapper>
          {Object.entries(categories).map(category => (
            <Button
              key={category[0]}
              variant={category === category[0] ? "contained" : "outlined"}
              color="primary"
              size="small"
              startIcon={category[1]}
              onClick={e => handleChangeCategory(e, category[0])}
            >
              {category[0]}
            </Button>
          ))}
        </CategoriesWrapper>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            onChange={handleChangeLanguage}
          >
            {Object.entries(languages).map(entry => (
              <MenuItem value={entry[0]} key={entry[0]}>
                <OptionWrapper>
                  <Avatar
                    alt={`flag-${entry[0].toLowerCase()}`}
                    src={entry[1]}
                    className={classes.small}
                  />
                  {entry[0]}
                </OptionWrapper>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" color="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default PlansForm;
