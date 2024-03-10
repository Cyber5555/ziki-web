import React, { useEffect } from "react";
import styles from "./staff.module.css";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { staffListRequest } from "../../store/authUsersReducer/staffListSlice.tsx";

const role = localStorage.getItem("role");

export const Staff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staff_data } = useSelector((state) => state.staffListSlice);

  useEffect(() => {
    dispatch(staffListRequest());
  }, [dispatch]);

  return (
    <div className={styles.Staff}>
      {staff_data.length > 0 ? (
        staff_data.map((staff, index) => (
          <Link
            to={`/staff/user/${staff.id}`}
            className={styles.ProjectsDevelopmentParent}
            key={index}>
            <div className={styles.CreatedUsers}>
              <div className={styles.UserNameFirstLatterOrImage}>
                {staff.avatar ? (
                  <img
                    src={staff.avatar}
                    alt={staff.avatar}
                    className={styles.Avatar}
                  />
                ) : (
                  staff.name[0]
                )}
              </div>
              <div className={styles.UserNameAndDeveloperType}>
                <p className={styles.UserName} id={styles.UserName}>
                  {staff.name}
                </p>
                <p className={styles.DeveloperType}>{staff.stack}</p>
              </div>
            </div>

            <h2 className={styles.ProjectsDevelopmentTitle}>
              Projects development
            </h2>
            <ul className={styles.ProjectsDevelopmentUL}>
              {staff.projects?.map((project, ind) => (
                <li key={ind}>{project.project_name}</li>
              ))}
            </ul>
          </Link>
        ))
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <p>your staff is empty</p>
        </div>
      )}
      <BlueButton
        onClick={() => navigate("/staff/add-staff")}
        role={role === "2"}>
        + invite or create user
      </BlueButton>
    </div>
  );
};
