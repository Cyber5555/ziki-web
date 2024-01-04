import React from "react";
import styles from "./userList.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toggleSelectUser } from "../../store/otherSlice/addUserInProjectSlice.tsx";

const UserList = ({ isOpen, close }) => {
  const dispatch = useDispatch();
  const { all_users } = useSelector((state) => state.getAllUsersSlice);
  const { selectedUsers } = useSelector((state) => state.addUserInProjectSlice);

  const handleCheckboxChange = (item) => {
    dispatch(toggleSelectUser(item));
  };

  return (
    <div className={`${isOpen ? styles.Background : styles.BackgroundClosed}`}>
      <div className={styles.UserListParent}>
        <span className={styles.ExitIsList} onClick={close}>
          <CloseIcon />
        </span>
        <div className={styles.UserList}>
          {all_users.map((user, i) => (
            <div className={styles.Users} key={i}>
              <div className={styles.LeftSide}>
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

              <input
                type="checkbox"
                className={styles.Checkbox}
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
