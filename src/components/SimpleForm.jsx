import React from 'react';
import { Formik, Field, ErrorMessage, useFormik } from 'formik';

const simpleForm = ({ action, validationSchema, channelData }) => {
  console.log(channelData.id);
  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: async ({ channel }) => {
      await action(channel, channelData.id);
    },
    validationSchema,
  });
  return (
    <form id="simpleForm" onSubmit={formik.handleSubmit}>
      <input
        name="channel"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.channel}
        className="w-100"
      />
      {formik.errors.channel ? <div className="text-danger">{formik.errors.channel}</div> : null}
    </form>
  );
};
export default simpleForm;
