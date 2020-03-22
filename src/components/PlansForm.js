import React, { useState } from "react";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";

import "../styles/PlansForm.css";
import PlansService from "./../services/PlansService";

const TextGroup = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="text-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const PlansForm = props => {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const urlInfo = props.location.state;

  if (redirectToHome) {
    return <Redirect to="/home" />;
  }
  return (
    <Formik
      initialValues={{
        title: (urlInfo && urlInfo.title) || "",
        host: (urlInfo && urlInfo.author) || "",
        link: (urlInfo && urlInfo.url) || "",
        category: "",
        audience: "",
        date: "",
        description: (urlInfo && urlInfo.description) || "",
        imageUrl:
          (urlInfo && urlInfo.image && urlInfo.image.url) ||
          "https://images.unsplash.com/photo-1504541989296-167df755af3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        language: ""
      }}
      // validationSchema={Yup.object({
      //   title: Yup.string().required("Title is required"),
      //   host: Yup.string().required("The host is required"),
      //   link: Yup.string().required("The link is required"),
      //   category: Yup.string().required("The category is required"),
      //   audience: Yup.string().required("The audience is required"),
      //   date: Yup.date().required("The date is required"),
      //   description: Yup.string(),
      //   language: Yup.string().required("The language of the plan is required")
      // })}
      validator={() => ({})}
      onSubmit={(values, { setSubmitting }) => {
        // setSubmitting(false);
        console.log(values);
        PlansService.createPlan(values).then(
          () => setRedirectToHome(true),
          error => {
            console.error(error);
          }
        );
      }}
    >
      {formik => (
        <form className="plans-form" onSubmit={formik.handleSubmit}>
          <TextGroup
            label="title"
            name="title"
            type="text"
            placeholder="Title"
          />
          <TextGroup label="host" name="host" type="text" placeholder="Host" />
          <TextGroup label="link" name="link" type="text" placeholder="Link" />
          <TextGroup
            label="category"
            name="category"
            type="text"
            placeholder="category"
          />
          <TextGroup
            label="audience"
            name="audience"
            type="text"
            placeholder="Audience"
          />
          <TextGroup label="date" name="date" type="text" placeholder="Date" />
          <TextGroup
            label="language"
            name="language"
            type="text"
            placeholder="Language"
          />
          <TextGroup
            label="description"
            name="description"
            type="text"
            placeholder="Description"
          />
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default PlansForm;
