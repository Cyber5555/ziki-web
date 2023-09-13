/* eslint-disable react/prop-types */
import { Draggable } from "react-beautiful-dnd";
import FlagMark from "../../assets/icons/flagMark.svg";
import styles from "../../screens/Project/project.module.css";

export const Tasks = ({ item, index }) => {
  return (
    // <div
    //   className={styles.Tasks}
    //   onMouseOver={(e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //   }}
    // >
    //   <p className={styles.TaskText}>{description}</p>
    //   {images.map((image, i) => (
    //     <img key={i} src={image} alt="Images" className={styles.Images} />
    //   ))}
    // </div> */}

    <Draggable draggableId={item.id.toString()} key={item.id} index={index}>
      {(provided) => (
        <div
          key={index}
          className={styles.Tasks}
          // draggable={true}
          // onDragOver={dragOverHandler}
          // onDragLeave={dragLeaveHandler}
          // onDragStart={(e) => dragStartHandler(e, board, item)}
          // onDragEnd={dragEndHandler}
          // onDrop={(e) => dropHandler(e, board, item)}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <div className={styles.TaskName}>
            <p>{item.name}</p>
            <img src={FlagMark} alt="FlagMark" />
          </div>
          <h3 className={styles.Complates}>Complate</h3>
          <div className={styles.SprintsParent}>
            {/*<Tasks id={item.id} title={item.description} />*/}
          </div>
          <div className={styles.CreatedUsersParent}>
            {item.users.map((user, $$) => (
              <div className={styles.CreatedUsers} key={$$}>
                <div className={styles.UserNameFirstLatterOrImage}>
                  {user.name[0]}
                </div>
                <div>
                  <p className={styles.UserNameAndDeveloperType}>{user.name}</p>
                  <p className={styles.UserNameAndDeveloperType}>
                    Front-end (50/15)
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.WorkTime}>
            <p className={styles.StartAndDeadline}>Start 13.06.2023</p>
            <p className={styles.StartAndDeadline}>Deadline 13.06.2023</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
