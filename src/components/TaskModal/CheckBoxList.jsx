import { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { BlueButton } from "../buttons/blueButton/BlueButton";
import { BorderButton } from "../buttons/borderButton/BorderButton";
import styles from "./taskModal.module.css";

const CheckBoxList = () => {
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
      text: "last",
      checked: false,
      hasChecked: true,
    },
  ]);

  const [focusedItemId, setFocusedItemId] = useState(null);

  const handleChangeText = (itemId, newText) => {
    setOrders((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, text: newText } : item
      )
    );
  };

  const toggleCheckbox = (itemId) => {
    setOrders((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };
  const handleSave = (event) => {
    event.preventDefault();
    alert("Save");
  };

  const handleCancel = (item) => {
    const itemIndex = orders.indexOf(item);
    if (itemIndex > -1) {
      orders.splice(itemIndex, 1);
    }
  };

  const isFocused = (itemId) => {
    setFocusedItemId(itemId);
  };

  const isBlur = (itemId) => {
    setFocusedItemId(null);
    const itemIndex = orders.indexOf(itemId);
    // if (itemIndex > -1) {
    orders.forEach((item) => {
      if (item.text === "") {
        orders.splice(itemIndex, 1);
      } else if (item.text !== "") {
        if (itemId === item) {
          item.hasChecked = true;
        }
      }
    });
    // }
  };

  const addEmptyList = (event) => {
    event.preventDefault();
    let newOrders = [...orders];
    const itemId = Math.random().toString();
    newOrders.push({
      id: itemId,
      text: "",
      checked: false,
      hasChecked: true,
    });
    setFocusedItemId(itemId);
    setOrders(newOrders);
  };

  return (
    <div className={styles.CheckList}>
      <div className={styles.ProgressBar__Parent}>
        <ProgressBar
          progress={orders.filter((item) => item.checked === true).length}
          target={orders.length}
        />
      </div>
      {orders.map((item) => (
        <div className={styles.ChecksParent} key={item.id}>
          <div className={styles.Checks}>
            {item.hasChecked && (
              <input
                type="checkbox"
                className={styles.Checkbox}
                checked={item.checked}
                onChange={() => toggleCheckbox(item.id)}
              />
            )}
            <textarea
              className={styles.TextAreaElement}
              value={item.text}
              onChange={(event) =>
                handleChangeText(item.id, event.target.value)
              }
              onFocus={() => isFocused(item.id)}
              onBlur={() => isBlur(item.id)}
              style={{ textDecoration: item.checked ? "line-through" : "none" }}
              // defaultValue={item.text}
              autoFocus={focusedItemId === item.id ? true : false}></textarea>
          </div>
          {focusedItemId === item.id && (
            <div className={styles.CancelSaveParent}>
              <BlueButton style={{ position: "static" }} onClick={handleSave}>
                Save
              </BlueButton>
              <BorderButton onClick={handleCancel}>Cancel</BorderButton>
            </div>
          )}
        </div>
      ))}
      {!focusedItemId && (
        <BlueButton style={{ position: "static" }} onClick={addEmptyList}>
          Add List
        </BlueButton>
      )}
    </div>
  );
};

export default CheckBoxList;
