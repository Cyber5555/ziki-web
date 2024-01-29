import React, { ChangeEvent, ReactNode } from "react";
import styles from "./fileInput.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface FileInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  multiple?: boolean;
  onRemove: () => void;
  parentStyle?: React.CSSProperties;
  childeStyle?: React.CSSProperties;
}

const FileInput: React.FC<FileInputProps> = ({
  onChange,
  children,
  multiple,
  onRemove,
  parentStyle,
  childeStyle,
}) => {
  return (
    <div className={styles.FileInputParent} style={parentStyle}>
      <input
        className={styles.FileInput}
        onChange={onChange}
        multiple={multiple}
        type="file"
      />
      <p style={childeStyle}>{children}</p>
      <span className={styles.RemoveFile} onClick={onRemove}>
        <DeleteOutlineIcon style={childeStyle} />
      </span>
    </div>
  );
};

export default FileInput;
