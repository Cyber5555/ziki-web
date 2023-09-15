// import React, { useRef, useState } from "react";
// import styles from "./taskModal.module.css";
// import CloseIcon from "@mui/icons-material/Close";
// // import { useSelector, useDispatch } from "react-redux";

// const TaskModal = ({ isOpen, close }) => {
//   const [height, setHeight] = useState(30);
//   const textareaRef = useRef(null);

//   const [orders, setOrders] = useState([
//     {
//       id: Math.random().toString(),
//       text: "",
//       checked: false,
//       hasChecked: false,
//     },
//   ]);

//   const handleInput = (event) => {
//     console.log(event.target);
//     if (event.target.offsetHeight < event.target.scrollHeight)
//       setHeight(event.target.scrollHeight);

//     const lines = textareaRef.current.textContent.split("\n");
//     console.log(lines.length);
//     return lines.length;
//   };

//   return (
//     <div className={`${isOpen ? styles.Background : styles.BackgroundClosed}`}>
//       <div className={styles.CheckListParent}>
//         <span className={styles.ExitIsList} onClick={close}>
//           <CloseIcon />
//         </span>
//         <div className={styles.CheckList}>
//           {orders.map((item, i) => (
//             <div className={styles.Checks} key={i}>
//               <input
//                 type="checkbox"
//                 className={styles.Checkbox}
//                 // checked={selectedUsers.includes(user.id)}
//                 // onChange={() => handleCheckboxChange(user.id)}
//               />
//               <textarea
//                 className={styles.TextAreaElement}
//                 ref={textareaRef}
//                 style={{ height: height }}
//                 value={item.text}
//                 onChange={(event) => {
//                   handleInput(event);
//                   setOrders((prevState) => prevState, {
//                     text: event.target.value,
//                   });
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TaskModal;

import React, { useRef, useState } from "react";
import styles from "./taskModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxList from "./CheckBoxList";
import NewList from "./NewList";
// import { useSelector, useDispatch } from "react-redux";

const TaskModal = ({ isOpen, close }) => {
  const [height, setHeight] = useState(30);
  const textareaRef = useRef(null);

  const [orders, setOrders] = useState([
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

  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //   setOrders((prevState) => prevState, {
  //     text: event.target.value,
  //   });

  //   console.log(orders);
  // };

  const handleSaveNew = (event) => {
    event.preventDefault();
    alert("Save");
  };

  return (
    <div className={`${isOpen ? styles.Background : styles.BackgroundClosed}`}>
      <div className={styles.CheckListParent}>
        <span className={styles.ExitIsList} onClick={close}>
          <CloseIcon />
        </span>
        <div className={styles.CheckList}>
          {orders.map((item, i) => (
            <React.Fragment key={i}>
              {item.hasChecked ? (
                <CheckBoxList
                  item={item}
                  handleChange={(e) => {
                    setOrders([{ text: e.target.value }]);
                  }}
                  handleInput={handleInput}
                  height={height}
                  textareaRef={textareaRef}
                />
              ) : (
                <NewList
                  item={item}
                  handleChange={(e) => {
                    setOrders([{ text: e.target.value }]);
                  }}
                  handleInput={handleInput}
                  height={height}
                  textareaRef={textareaRef}
                  handleSaveNew={handleSaveNew}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TaskModal;
