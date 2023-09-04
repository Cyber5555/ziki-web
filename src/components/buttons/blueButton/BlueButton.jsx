/* eslint-disable react/prop-types */
import styles from "./blueButton.module.css";
import { Link } from "react-router-dom";

export const BlueButton = ({ to, style, children, onClick }) => {
  return (
    <Link to={to} className={styles.Link} style={style} onClick={onClick}>
      {children}
    </Link>
  );
};
