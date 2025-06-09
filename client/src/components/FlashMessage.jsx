import React from "react";

const FlashMessage = ({ theme, text }) => {
  return <div className={"alert alert-" + theme}>{text}</div>;
};

export default FlashMessage;
