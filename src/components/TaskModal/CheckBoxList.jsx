import { BlueButton } from "../buttons/blueButton/BlueButton";
import { BorderButton } from "../buttons/borderButton/BorderButton";
import styles from "./taskModal.module.css";

const CheckBoxList = ({
  item,
  height,
  handleChange,
  handleInput,
  textareaRef,
  handleCheckboxChange,
  handleSave,
  handleCancel,
  focused,
  isBlur,
  isFocused,
}) => {
  return (
    <div className={styles.ChecksParent}>
      <div className={styles.Checks}>
        {item.hasChecked && (
          <input
            type="checkbox"
            className={styles.Checkbox}
            checked={item.checked}
            onChange={handleCheckboxChange}
          />
        )}
        <textarea
          className={styles.TextAreaElement}
          ref={textareaRef}
          style={{ height: height }}
          value={item.text}
          onChange={handleChange}
          onInput={handleInput}
          onFocus={isFocused}
          onBlur={isBlur}
        />
      </div>
      {focused === item.id && (
        <div className={styles.CancelSaveParent}>
          <BlueButton style={{ position: "static" }} onClick={handleSave}>
            Save
          </BlueButton>
          <BorderButton onClick={handleCancel}>Cancel</BorderButton>
        </div>
      )}
    </div>
  );
};

export default CheckBoxList;
