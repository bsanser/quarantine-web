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
        title: urlInfo.title || "",
        host: urlInfo.author || "",
        link: urlInfo.url || "",
        categories: "",
        audience: "",
        date: "",
        description: urlInfo.description || ""
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Title is required"),
        host: Yup.string().required("The host is required"),
        link: Yup.string().required("The link is required"),
        categories: Yup.string().required("The category is required"),
        audience: Yup.string().required("The audience is required"),
        date: Yup.date().required("The date is required"),
        description: Yup.string()
      })}
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
            label="categories"
            name="categories"
            type="text"
            placeholder="Categories"
          />
          <TextGroup
            label="audience"
            name="audience"
            type="text"
            placeholder="Audience"
          />
          <TextGroup label="date" name="date" type="text" placeholder="Date" />
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
