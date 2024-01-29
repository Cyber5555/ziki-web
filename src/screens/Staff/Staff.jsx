import React from "react";
import styles from "./staff.module.css";
import { RenderedItems } from "../../Components/RenderedItems/RenderedItems";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton";
import { useNavigate } from "react-router-dom";

const data = ["Back - end", "Front - end"];

export const Staff = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.Staff}>
      {data.map((_, $) => (
        <RenderedItems key={$}>
          <h2 className={styles.Title}>{_}</h2>
          <div className={styles.Line}></div>
          <div className={styles.ProjectsDevelopmentParent}>
            <div className={styles.CreatedUsers}>
              <div className={styles.UserNameFirstLatterOrImage}>A</div>
              <div>
                <p
                  className={styles.UserNameAndDeveloperType}
                  id={styles.UserName}>
                  Armen Vardanyan
                </p>
                <p className={styles.UserNameAndDeveloperType}>
                  Front-end (50/15)
                </p>
              </div>
            </div>
            <h2 className={styles.ProjectsDevelopmentTitle}>
              Projects development
            </h2>
            <ul className={styles.ProjectsDevelopmentUL}>
              <li>Project</li>
              <li> MigMotors</li>
              <li>SMMStudio</li>
            </ul>
          </div>
        </RenderedItems>
      ))}
      <BlueButton onClick={() => navigate("/add-staff")}>
        + Add Staff
      </BlueButton>
    </div>
  );
};
