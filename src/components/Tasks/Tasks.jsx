/* eslint-disable react/prop-types */
import styles from "./tasks.module.css";

export const Tasks = ({ id, title, description, images }) => {
  return (
    <div
      className={styles.Tasks}
      onMouseOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}>
      <h3 className={styles.Title}>{title}</h3>
      <p className={styles.TaskText}>{description}</p>
      {images.map((image, i) => (
        <img src={image} alt="Images" />
      ))}
    </div>
  );
};
