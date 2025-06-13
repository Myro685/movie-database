import React from "react";

const PersonFilter = (props) => {
  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleSubmit = (e) => {
    props.handleSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="number"
        min="1"
        name={props.name}
        handleChange={handleChange}
        label={props.label}
        prompt="neuveden"
        value={props.value}
      />

      <input
        type="submit"
        className="btn btn-secondary float-right mt-2"
        value={props.confirm}
      />
    </form>
  );
};

export default PersonFilter;
