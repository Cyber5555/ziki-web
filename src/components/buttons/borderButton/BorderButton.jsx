import React from "react";
import styles from "./borderButton.module.css";

const BorderButton = ({
  children,
  onClick,
  style,
  type = "button",
  disabled,
}) => {
  return (
    <button
      className={styles.Link}
      onClick={onClick}
      style={style}
      type={type}
      disabled={disabled}>
      {children}
    </button>
  );
};

export { BorderButton };
