import React, { useEffect } from "react";
import styles from "./developerPersonalPage.module.css";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { staffListRequest } from "../../store/authUsersReducer/staffListSlice.tsx";

const DeveloperPersonalPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { staff_data } = useSelector((state) => state.staffListSlice);

  useEffect(() => {
    dispatch(staffListRequest(userId));
  }, [dispatch, userId]);

  return (
    <div className={styles.DeveloperPersonalPage}>
      <Avatar
        src={staff_data.avatar}
        alt={staff_data.name}
        sx={{ width: 100, height: 100 }}
      />
      <h2>{staff_data.name}</h2>
      <p>{staff_data.stack}</p>
    </div>
  );
};

export default DeveloperPersonalPage;
