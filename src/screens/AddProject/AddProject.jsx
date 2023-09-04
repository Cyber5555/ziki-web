import React, { useState } from "react";
import styles from "./addProject.module.css";
import { BigRenderer } from "../../components/BigRenderer/BigRenderer";
import { BorderButton } from "../../components/buttons/borderButton/BorderButton";
import { BlueButton } from "../../components/buttons/blueButton/BlueButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addProjectRequest } from "../../store/authUsersReducer/addProjectSlice";
import FileInput from "../../components/fileInput/fileInput";

export const AddProject = () => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [users, setUsers] = useState([]);
  const [projectLogo, setProjectLogo] = useState("asdasd.jpg");
  const [projectTz, setProjectTz] = useState({});
  const { all_project_data, errorMessages } = useSelector(
    (state) => state.addProjectSlice
  );

  const handleSubmit = (e) => {
    // e.stopPropagation();
    e.preventDefault();
    dispatch(
      addProjectRequest({
        projectName,
        description,
        startDate,
        endDate,
        users,
        projectLogo,
        projectTz,
      })
    );
  };

  console.log(errorMessages);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className={styles.AddProjects}>
        <BigRenderer>
          <div className={styles.StartAndDeadlineParent}>
            <div className={styles.WorkingTimeParent}>
              {/* <p className={styles.WorkingTimeTitle}>Start</p> */}
              {/* <input
                  className={styles.StartAndDeadlineDate}
                  placeholder="13.06.2023"
                /> */}
              <DemoItem label="Start">
                <MobileDatePicker
                  // defaultValue={moment(new Date())}
                  className={styles.StartAndDeadlineDate}
                  format="DD.MM.YYYY"
                  onChange={(value) => setStartDate(value)}
                  value={startDate}
                />
              </DemoItem>
            </div>
            <div className={styles.WorkingTimeParent}>
              {/* <p className={styles.WorkingTimeTitle}>Deadline</p> */}
              {/* <input
                className={styles.StartAndDeadlineDate}
                placeholder="dd.mm.yyyy"
              /> */}
              <DemoItem label="Deadline">
                <MobileDatePicker
                  // defaultValue={moment(new Date())}
                  className={styles.StartAndDeadlineDate}
                  format="DD.MM.YYYY"
                  onChange={(value) => setEndDate(value)}
                  value={endDate}
                />
              </DemoItem>
            </div>
          </div>
          <div className={styles.Line}></div>

          <input
            className={styles.ProjectTitle}
            placeholder={"Projects name"}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            type="text"
          />
          <p className={styles.ErrorMessage}>{errorMessages?.name}</p>

          <textarea
            className={styles.ProjectDescription}
            placeholder={"Projects description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className={styles.ButtonsParent}>
            <FileInput
              onChange={(e) => {
                setProjectLogo(e.target.files[0]);
              }}
              onRemove={() => {
                setProjectLogo({});
              }}>
              {projectLogo?.name ? projectLogo?.name : "+ Add project logo"}
            </FileInput>
            <FileInput
              onChange={(e) => {
                console.log(e.target.files[0].name);
                setProjectTz(e.target.files[0]);
              }}
              onRemove={() => {
                setProjectTz({});
              }}>
              {projectTz?.name ? projectTz?.name : "+ Add project tz"}
            </FileInput>
            <BorderButton>+ Add project design</BorderButton>
            <BorderButton>+ Add project logoStatus project</BorderButton>
          </div>

          <BlueButton style={{ position: "static", marginTop: 12 }}>
            + Add user
          </BlueButton>
          <br />
          <br />
          <p className={styles.ErrorMessage}>
            {errorMessages?.project_logo}
            <br />
            {errorMessages?.project_tz}
          </p>

          <BlueButton
            style={{ position: "absolute", right: 20, bottom: 20 }}
            onClick={(e) => handleSubmit(e)}>
            Save
          </BlueButton>
        </BigRenderer>
      </div>
    </LocalizationProvider>
  );
};
