/* eslint-disable react/prop-types */
import styles from "./renderedItems.module.css";

export const RenderedItems = ({ children, style }) => {
  return (
    <div className={styles.RenderedItems} style={style}>
      {children}
    </div>
  );
};
