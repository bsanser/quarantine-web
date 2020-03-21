import React from "react";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import "../styles/PlansForm.css";

const TextGroup = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
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

const PlansForm = () => {
  return (
    <Formik
      initialValues={{
        title: "",
        host: "",
        link: "",
        categories: "",
        audience: "",
        date: "",
        description: ""
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
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
