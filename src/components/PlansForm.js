import React, { useState } from "react";
import { device } from "./../styles/breakpoints";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CATEGORIES from "./../constants/categories";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DateTimePicker } from "@material-ui/pickers";
import { Redirect } from "react-router-dom";
import {
  replaceSpaceWithHyphens,
  capitalizeString
} from "./../utils/string-utils";

import PlansService from "./../services/PlansService";
import languages from "./../constants/languages";

const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media ${device.tablet} {
    width: 400px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: white;
  margin: 0 auto;
  height: 100%;
`;

const FormHeader = styled.h1`
  font-size: 20px;
  color: black;
  margin-top: 0;
  margin-bottom: 16px;
`;

const StyledInputLabel = styled(InputLabel)`
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0, 0.54);
  font-size: 12px;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${({ hasError }) => (hasError ? "0" : "16px")};
  border: 1px solid;
  border-color: ${({ hasError }) => (hasError ? "red" : "rgba(0, 0, 0, 0.23)")};
  border-radius: 4px;
  padding: 18.5px 14px;

  > div {
    padding: 2px;
    margin-right: 4px;
    margin-bottom: 4px;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  > div {
    margin-right: 10px;
  }
`;

const StyledSelect = styled(Select)`
  border: 1px solid;
  border-color: ${({ hasError }) => (hasError ? "red" : "rgba(0, 0, 0, 0.23)")};
  border-radius: 4px;
  padding: 10px 8px;
  margin-bottom: ${({ hasError }) => (hasError ? "0" : "16px")};
`;

const StyledFormHelperText = styled(FormHelperText)`
  margin-bottom: 16px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  button:first-child {
    margin-right: 8px;
  }
`;

const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    marginBottom: "16px"
  },
  wrapper: {
    position: "relative"
  },
  buttonProgress: {
    color: theme.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

const PlansForm = props => {
  const classes = useStyles();
  const urlInfo = props.location.state;
  const [formState, setFormState] = useState({
    title: (urlInfo && urlInfo.title) || "",
    description: (urlInfo && urlInfo.description) || "",
    link: (urlInfo && urlInfo.url) || "",
    date: null,
    category: "",
    language: "",
    imageUrl:
      (urlInfo && urlInfo.image && urlInfo.image.url) ||
      "https://images.unsplash.com/photo-1504541989296-167df755af3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  });

  const [redirectToHome, setRedirectToHome] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = formState => {
    let newErrors = {};
    Object.keys(formState).forEach(field => {
      if (!formState[field] || formState[field].length === 0) {
        newErrors[field] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (redirectToHome) {
    return <Redirect to="/home" />;
  }

  const handleChangeInput = event => {
    const newState = { ...formState, [event.target.name]: event.target.value };
    setFormState(newState);
  };
  const handleChangeDate = value => {
    const newState = { ...formState, date: value };
    setFormState(newState);
  };

  const handleChangeCategory = (_event, categoryItem) => {
    const newState = {
      ...formState,
      category: replaceSpaceWithHyphens(categoryItem)
    };
    setFormState(newState);
  };

  const handleChangeLanguage = event => {
    const newState = { ...formState, language: event.target.value };
    setFormState(newState);
  };

  const handleSubmit = event => {
    const {
      date,
      title,
      description,
      link,
      category,
      language,
      imageUrl
    } = formState;
    event.preventDefault();
    validateForm(formState);
    if (validateForm(formState)) {
      setIsSubmitting(true);
      PlansService.createPlan({
        date,
        title,
        description,
        link,
        category: category.toLowerCase(),
        language,
        imageUrl
      }).then(
        () => {
          setIsSubmitting(false);
          setRedirectToHome(true);
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormHeader>Add a plan:</FormHeader>
        <FormControl className={classes.formControl}>
          <TextField
            id="title"
            label="Title"
            name="title"
            value={formState.title}
            onChange={handleChangeDate}
            onAccept={handleChangeInput}
            variant="outlined"
            error={errors["title"]}
            helperText={errors["title"] ? "The title is required" : ""}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="description"
            id="description"
            label="Description"
            value={formState.description}
            onChange={handleChangeInput}
            multiline
            variant="outlined"
            error={errors["description"]}
            helperText={errors["title"] ? "A description is required" : ""}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="link"
            id="link"
            label="Link"
            value={formState.link}
            onChange={handleChangeInput}
            variant="outlined"
            error={errors["link"]}
            helperText={errors["link"] ? "The link is required" : ""}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <DateTimePicker
            value={formState.date}
            inputVariant="outlined"
            disablePast
            onChange={handleChangeDate}
            label="Date and time of the plan"
            showTodayButton
            error={errors["date"]}
            helperText={errors["date"] ? "The date is required" : ""}
          />
        </FormControl>

        <StyledInputLabel error={errors["category"]}>
          Category*
        </StyledInputLabel>
        <CategoriesWrapper hasError={errors["category"]}>
          {Object.entries(CATEGORIES).map(c => {
            return (
              <Chip
                key={c[0]}
                icon={c[1]}
                size="small"
                label={c[0]}
                clickable
                color="primary"
                onClick={e => handleChangeCategory(e, c[0])}
                variant={
                  formState.category === replaceSpaceWithHyphens(c[0])
                    ? "default"
                    : "outlined"
                }
              />
            );
          })}
        </CategoriesWrapper>
        {errors["category"] && (
          <StyledFormHelperText
            error={errors["category"]}
            id="component-helper-text"
          >
            Please select a category
          </StyledFormHelperText>
        )}
        <StyledInputLabel error={errors["language"]}>Language</StyledInputLabel>
        <StyledSelect
          id="demo-simple-select"
          onChange={handleChangeLanguage}
          className={classes.select}
          hasError={errors["language"]}
        >
          {Object.entries(languages).map(entry => (
            <MenuItem value={entry[0]} key={entry[0]}>
              <OptionWrapper>
                <Avatar
                  alt={`flag-${entry[0].toLowerCase()}`}
                  src={entry[1]}
                  className={classes.small}
                />
                {capitalizeString(entry[0])}
              </OptionWrapper>
            </MenuItem>
          ))}
        </StyledSelect>
        {errors["language"] && (
          <StyledFormHelperText
            error={errors["language"]}
            id="component-helper-text"
          >
            Please select the language
          </StyledFormHelperText>
        )}
        <ButtonsContainer>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setRedirectToHome(true)}
          >
            Cancel
          </Button>
          <div className={classes.wrapper}>
          <Button variant={isSubmitting?"outlined":"contained"} color="primary" type="submit">
            Send
          </Button>
          {isSubmitting && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
          </div>
        </ButtonsContainer>
      </Form>
    </Container>
  );
};

export default PlansForm;
