import React, { useState } from "react";
import styles from "./addProject.module.css";
import { BigRenderer } from "../../Components/BigRenderer/BigRenderer";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addProjectRequest } from "../../store/authUsersReducer/addProjectSlice.tsx";
import FileInput from "../../Components/fileInput/fileInput.tsx";
import { ClipLoader } from "react-spinners";
import UserList from "../../Components/UserList/UserList";
import { useNavigate } from "react-router-dom";
import { staffListRequest } from "../../store/authUsersReducer/staffListSlice.tsx";

export const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectLogo, setProjectLogo] = useState(null);
  const [projectTz, setProjectTz] = useState(null);
  const [openUserList, setOpenUserList] = useState(false);
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
  });

  const { isLoading, errorMessages } = useSelector(
    (state) => state.addProjectSlice
  );

  const { selectedUsers } = useSelector((state) => state.addUserInProjectSlice);

  const openModal = () => {
    setOpenUserList(true);
    dispatch(staffListRequest());
  };

  const closeModal = () => setOpenUserList(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(
      addProjectRequest({
        projectName: formData.projectName,
        description: formData.description,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
        users: selectedUsers,
        projectLogo,
        projectTz,
      })
    ).then((res) => {
      if (res.payload?.payload?.original?.success) {
        navigate("/", {
          replace: true,
        });
      }
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className={styles.AddProjects}>
        <form onSubmit={handleSubmit}>
          <BigRenderer>
            <div className={styles.ScrollableBox}>
              <div className={styles.StartAndDeadlineParent}>
                <div className={styles.WorkingTimeParent}>
                  <DemoItem label="Start">
                    <MobileDatePicker
                      className={styles.StartAndDeadlineDate}
                      format="YYYY-MM-DD"
                      onChange={(e) => setStartDate(e)}
                      value={startDate}
                      minDate={moment(new Date())}
                    />
                  </DemoItem>
                  <p className={styles.ErrorMessage}>
                    {/* {errorMessages?.name ||
                    (errors.startDate && touched.startDate && errors.startDate)} */}
                  </p>
                </div>
                <div className={styles.WorkingTimeParent}>
                  <DemoItem label="Deadline">
                    <MobileDatePicker
                      className={styles.StartAndDeadlineDate}
                      format="YYYY-MM-DD"
                      onChange={(e) => setEndDate(e)}
                      value={endDate}
                      minDate={moment(new Date())}
                    />
                  </DemoItem>
                  <p className={styles.ErrorMessage}>
                    {/* {errorMessages?.name ||
                    (errors.endDate && touched.endDate && errors.endDate)} */}
                  </p>
                </div>
              </div>
              <div className={styles.Line}></div>
              <input
                type="text"
                name="projectName"
                onChange={handleChange}
                className={styles.ProjectTitle}
                placeholder={"Projects name"}
                value={formData.projectName}
              />
              {/* {errors.projectName &&
                  touched.projectName &&
                  errors.projectName} */}
              <p className={styles.ErrorMessage}>
                {/* {errorMessages?.name ||
                (errors.projectName &&
                  touched.projectName &&
                  errors.projectName)} */}
              </p>
              <textarea
                className={styles.ProjectDescription}
                placeholder={"Projects description"}
                value={formData.description}
                name="description"
                onChange={handleChange}
                // onBlur={handleBlur}
              />
              <div className={styles.ButtonsParent}>
                <FileInput
                  onChange={(e) => {
                    setProjectLogo(e.target.files[0]);
                  }}
                  onRemove={() => {
                    setProjectLogo(null);
                  }}>
                  {projectLogo?.name ? projectLogo?.name : "+ Add project logo"}
                </FileInput>
                <FileInput
                  onChange={(e) => {
                    setProjectTz(e.target.files[0]);
                  }}
                  onRemove={() => {
                    setProjectTz(null);
                  }}>
                  {projectTz?.name ? projectTz?.name : "+ Add project tz"}
                </FileInput>
                {/* <BorderButton>+ Add project design</BorderButton>
              <BorderButton>+ Add project logoStatus project</BorderButton> */}
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
                onClick={(e) => e.stopPropagation()}
                type={"submit"}
                disabled={isLoading}>
                {isLoading ? (
                  <ClipLoader loading={isLoading} size={15} color="white" />
                ) : (
                  "Save"
                )}
              </BlueButton>
              <div className={styles.UsersParent}>
                <h2 className={styles.UsersTitle}>Users</h2>
              </div>
              {selectedUsers.length > 0 ? (
                selectedUsers?.map((user, index) => (
                  <div className={styles.CreatedUsers} key={index}>
                    <p className={styles.UserNameFirstLatterOrImage}>
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.avatar}
                          className={styles.Avatar}
                        />
                      ) : (
                        <>
                          {user?.name[0]}
                          {/* {user?.name?.split(" ")[1][0]} */}
                        </>
                      )}
                    </p>
                    <div>
                      <p className={styles.UserNameAndDeveloperType}>
                        {user.name}
                      </p>
                      <p className={styles.UserNameAndDeveloperType}>
                        {user.stack} (50/15)
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No selected user</p>
              )}
            </div>
          </BigRenderer>
        </form>
      </div>

      <UserList isOpen={openUserList} close={closeModal} />
    </LocalizationProvider>
  );
};
