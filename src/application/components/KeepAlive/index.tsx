/* eslint-disable react/prop-types */
import React from "react";
import { withRouter } from "react-router-dom";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";


export const KeepAlive = withRouter(function (props) {
  const { match, component, ...otherProps } = props;
  const RenderComponent = component;
  return (
    <div style={match ? {} : { display: "none" }}>
      <RenderComponent {...otherProps} />
    </div>
  )
});


KeepAlive.propTypes = {

};

KeepAlive.defaultProps = {

};