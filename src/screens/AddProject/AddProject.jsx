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
import { ClipLoader } from "react-spinners";

import { getAllUsersRequest } from "../../store/authUsersReducer/getAllUsersSlice";
import UserList from "../../components/UserList/UserList";
import { useNavigate } from "react-router-dom";

export const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [projectLogo, setProjectLogo] = useState({});
  const [projectTz, setProjectTz] = useState({});
  const [openUserList, setOpenUserList] = useState(false);
  const { isLoading, errorMessages } = useSelector(
    (state) => state.addProjectSlice
  );
  const { all_users } = useSelector((state) => state.getAllUsersSlice);

  const { selectedUsers } = useSelector((state) => state.addUserInProjectSlice);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProjectRequest({
        projectName,
        description,
        startDate: moment(startDate).format("DD.MM.YYYY"),
        endDate: moment(endDate).format("DD.MM.YYYY"),
        users: selectedUsers,
        projectLogo,
        projectTz,
      })
    ).then((res) => {
      console.log(res.payload.payload.original.success);
      if (res.payload?.payload?.original?.success) {
        navigate("/", {
          replace: true,
        });
      }
    });
  };

  const openModal = () => {
    setOpenUserList(true);
    dispatch(getAllUsersRequest({}));
  };

  const closeModal = () => {
    setOpenUserList(false);
  };

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

          <BlueButton
            style={{ position: "static", marginTop: 12 }}
            onClick={openModal}>
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
            {isLoading ? (
              <ClipLoader loading={isLoading} size={15} color="white" />
            ) : (
              "Save"
            )}
          </BlueButton>
          <div className={styles.UsersParent}>
            <h2 className={styles.UsersTitle}>Users</h2>
            {/* <img src={EditIcon} alt="Edit Icon" style={{ cursor: "pointer" }} /> */}
          </div>

          {all_users?.map(
            (user, index) =>
              selectedUsers.includes(user.id) && (
                <div className={styles.CreatedUsers} key={index}>
                  <p className={styles.UserNameFirstLatterOrImage}>
                    {user?.name && user?.name[0]}
                    {user?.name && user?.name?.split(" ")[1][0]}
                  </p>
                  <div>
                    <p className={styles.UserNameAndDeveloperType}>
                      {user.name}
                    </p>
                    <p className={styles.UserNameAndDeveloperType}>
                      Front-end (50/15)
                    </p>
                  </div>
                </div>
              )
          )}
        </BigRenderer>
      </div>

      <UserList isOpen={openUserList} close={closeModal} />
    </LocalizationProvider>
  );
};
