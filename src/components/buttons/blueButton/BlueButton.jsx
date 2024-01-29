import styles from "./blueButton.module.css";

const BlueButton = ({
  disabled,
  style,
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      className={styles.Link}
      type={type}
      style={style}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export { BlueButton };
