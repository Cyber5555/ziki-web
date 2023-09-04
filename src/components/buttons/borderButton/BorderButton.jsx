import React from "react";
import styles from "./borderButton.module.css";
import { Link } from "react-router-dom";

export const BorderButton = ({ to, children, onClick }) => {
  return (
    <Link to={to} className={styles.Link} onClick={onClick}>
      {children}
    </Link>
  );
};
