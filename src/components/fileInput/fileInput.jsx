import React from "react";
import styles from "./fileInput.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const FileInput = ({ onChange, children, value, onRemove }) => {
  return (
    <div className={styles.FileInputParent}>
      <input className={styles.FileInput} onChange={onChange} type={"file"} />
      <p>{children}</p>
      <span className={styles.RemoveFile} onClick={onRemove}>
        <DeleteOutlineIcon />
      </span>
    </div>
  );
};

export default FileInput;
