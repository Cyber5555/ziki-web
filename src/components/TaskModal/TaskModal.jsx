import React, { useRef, useState } from "react";
import styles from "./taskModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxList from "./CheckBoxList";
import { BlueButton } from "../buttons/blueButton/BlueButton";

const TaskModal = ({ isOpen, close }) => {
  const [height, setHeight] = useState(30);
  const textareaRef = useRef(null);

  const [orders, setOrders] = useState([
    {
      id: Math.random().toString(),
      text: "guyny poxel",
      checked: false,
      hasChecked: true,
    },
    {
      id: Math.random().toString(),
      text: "buttony poxel",
      checked: false,
      hasChecked: true,
    },
    {
      id: Math.random().toString(),
      text: "",
      checked: false,
      hasChecked: false,
    },
  ]);

  const handleInput = (event) => {
    console.log(event.target);
    if (event.target.offsetHeight < event.target.scrollHeight)
      setHeight(event.target.scrollHeight);

    const lines = textareaRef.current.textContent.split("\n");
    console.log(lines.length);
    return lines.length;
  };

  const handleChangeText = (itemId, newText) => {
    setOrders((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, text: newText } : item
      )
    );
  };

  const handleSave = (event) => {
    event.preventDefault();
    alert("Save");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    alert("Cancel");
  };

  const toggleCheckbox = (itemId) => {
    setOrders((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const [focusedItemId, setFocusedItemId] = useState(null);

  const isFocused = (itemId) => {
    setFocusedItemId(itemId);
  };

  const isBlur = () => {
    setFocusedItemId(null);
  };
  return (
    <div className={`${isOpen ? styles.Background : styles.BackgroundClosed}`}>
      <div className={styles.CheckListParent}>
        <span className={styles.ExitIsList} onClick={close}>
          <CloseIcon />
        </span>

        <input value={"Header"} className={styles.InputElement} />
        <h3 className={styles.CheckListTitle}>Check List</h3>
        <div className={styles.CheckList}>
          {orders.map((item, i) => (
            <CheckBoxList
              key={item.id}
              item={item}
              handleChange={(e) => handleChangeText(item.id, e.target.value)}
              handleInput={handleInput}
              height={height}
              textareaRef={textareaRef}
              handleSave={handleSave}
              handleCancel={handleCancel}
              handleCheckboxChange={() => toggleCheckbox(item.id)}
              focused={focusedItemId}
              isFocused={(e) => isFocused(item.id)}
              isBlur={isBlur}
            />
          ))}
        </div>
        {!focusedItemId && (
          <BlueButton style={{ position: "static" }}>Add List</BlueButton>
        )}
      </div>
    </div>
  );
};
export default TaskModal;
