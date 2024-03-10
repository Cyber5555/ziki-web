import React from "react";
import styles from "./userList.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toggleSelectUser } from "../../store/otherSlice/addUserInProjectSlice.tsx";

const UserList = ({ isOpen, close }) => {
  const dispatch = useDispatch();
  const { staff_data } = useSelector((state) => state.staffListSlice);
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
          {staff_data.map((user, i) => (
            <label className={styles.Users} key={i}>
              <div className={styles.LeftSide}>
                <div className={styles.UserNameFirstLatterOrImage}>
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.avatar}
                      className={styles.Avatar}
                    />
                  ) : (
                    user?.name[0]
                  )}
                </div>
                <div>
                  <p className={styles.UserNameAndDeveloperType}>{user.name}</p>
                  <p className={styles.UserNameAndDeveloperType}>
                    {user.stack} (50/15)
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                className={styles.Checkbox}
                checked={selectedUsers.includes(user)}
                onChange={() => handleCheckboxChange(user)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
