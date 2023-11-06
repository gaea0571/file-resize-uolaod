/* eslint-disable react/prop-types */
import React from "react";
import { Space } from "antd";
import { NavLink } from "react-router-dom";

export function BasicLayout(props) {
  const { children, navigations } = props;
  return (
    <div style={{ width: "60%", margin: "0px auto", textAlign: "center" }}>
      <Space>
        {navigations.map(({ name, value }) => {
          return (
            <NavLink to={value} key={value}>{name}</NavLink>
          )
        })}
      </Space>
      <div style={{ padding: 20 }}>
        {children}
      </div>
    </div>
  )
};


BasicLayout.propTypes = {


};
BasicLayout.defaultProps = {
  navigations: []
};