import React from "react";
import styles from "./input.module.css";
import { TextField } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
const Input = ({
  onChange,
  label,
  value,
  error,
  type = "text",
  showPassword,
  changeShowPassword,
  password,
  errorMessage,
  name,
  parentStyle,
}) => {
  return (
    <div className={styles.InputParent} style={parentStyle}>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={value}
        className={styles.Input}
        onChange={onChange}
        error={error}
        type={type}
        name={name}
      />
      {password && (
        <div className={styles.ShowPassword} onClick={changeShowPassword}>
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </div>
      )}
      <p className={styles.ErrorMessage}>{errorMessage}</p>
    </div>
  );
};

export default Input;
