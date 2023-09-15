import { BlueButton } from "../../components/buttons/blueButton/BlueButton";

import styles from "./taskModal.module.css";

const NewList = (props) => {
  return (
    <div className={styles.ChecksParent}>
      <div className={styles.Checks}>
        {/* <input
        type="checkbox"
        className={styles.Checkbox}
        checked={props.item.checked}
        onChange={props.handleCheckboxChange}
      /> */}
        <textarea
          className={styles.TextAreaElement}
          ref={props.textareaRef}
          style={{ height: props.height }}
          value={props.item.text}
          onChange={props.handleChange}
          onInput={props.handleInput}
        />
      </div>
      <div className={styles.CancelSaveParent}>
        <BlueButton style={{ position: "static" }} onClick={props.handleSaveNew}>Save</BlueButton>
      </div>
    </div>
  );
};

export default NewList;
