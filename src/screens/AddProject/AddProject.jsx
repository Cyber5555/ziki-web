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
import { addProjectRequest } from "../../store/authUsersReducer/addProjectSlice.tsx";
import FileInput from "../../components/fileInput/fileInput";
import { ClipLoader } from "react-spinners";

import { getAllUsersRequest } from "../../store/authUsersReducer/getAllUsersSlice.tsx";
import UserList from "../../components/UserList/UserList";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

export const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectLogo, setProjectLogo] = useState({});
  const [projectTz, setProjectTz] = useState({});
  const [openUserList, setOpenUserList] = useState(false);
  const { isLoading, errorMessages } = useSelector(
    (state) => state.addProjectSlice
  );
  const { all_users } = useSelector((state) => state.getAllUsersSlice);

  const { selectedUsers } = useSelector((state) => state.addUserInProjectSlice);

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
        <Formik
          initialValues={{
            description: "",
            projectName: "",
            startDate: moment(new Date()),
            endDate: moment(new Date()),
          }}
          validate={(values) => {
            const errors = {};
            // if (!values.email) {
            //   errors.email = "Required";
            // } else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            // ) {
            //   errors.email = "Invalid email address";
            // }
            if (!values.projectName) {
              errors.projectName = "Required";
            }
            if (!values.startDate) {
              errors.startDate = "Required";
            }
            if (!values.endDate) {
              errors.endDate = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);
            console.log(values);
            console.log(setSubmitting);
            dispatch(
              addProjectRequest({
                projectName: values.projectName,
                description: values.description,
                startDate: moment(values.startDate).format("DD.MM.YYYY"),
                endDate: moment(values.endDate).format("DD.MM.YYYY"),
                users: selectedUsers,
                projectLogo,
                projectTz,
              })
            ).then((res) => {
              if (res.payload?.payload?.original?.success) {
                console.log(res.payload.payload.original.success);
                navigate("/", {
                  replace: true,
                });
              }
            });
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <BigRenderer>
                <div className={styles.StartAndDeadlineParent}>
                  <div className={styles.WorkingTimeParent}>
                    <DemoItem label="Start">
                      <MobileDatePicker
                        // defaultValue={moment(new Date())}
                        className={styles.StartAndDeadlineDate}
                        format="DD.MM.YYYY"
                        onChange={handleChange}
                        value={values.startDate}
                        onError={handleBlur}
                      />
                    </DemoItem>
                    <p className={styles.ErrorMessage}>
                      {errorMessages?.name ||
                        (errors.startDate &&
                          touched.startDate &&
                          errors.startDate)}
                    </p>
                  </div>
                  <div className={styles.WorkingTimeParent}>
                    <DemoItem label="Deadline">
                      <MobileDatePicker
                        // defaultValue={moment(new Date())}
                        className={styles.StartAndDeadlineDate}
                        format="DD.MM.YYYY"
                        onChange={handleChange}
                        value={values.endDate}
                        onError={handleBlur}
                      />
                    </DemoItem>
                    <p className={styles.ErrorMessage}>
                      {errorMessages?.name ||
                        (errors.endDate && touched.endDate && errors.endDate)}
                    </p>
                  </div>
                </div>
                <div className={styles.Line}></div>
                <input
                  type="text"
                  name="projectName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.ProjectTitle}
                  placeholder={"Projects name"}
                  value={values.projectName}
                />
                {/* {errors.projectName &&
                  touched.projectName &&
                  errors.projectName} */}
                <p className={styles.ErrorMessage}>
                  {errorMessages?.name ||
                    (errors.projectName &&
                      touched.projectName &&
                      errors.projectName)}
                </p>
                <textarea
                  className={styles.ProjectDescription}
                  placeholder={"Projects description"}
                  value={values.description}
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className={styles.ButtonsParent}>
                  <FileInput
                    onChange={(e) => {
                      setProjectLogo(e.target.files[0]);
                    }}
                    onRemove={() => {
                      setProjectLogo({});
                    }}>
                    {projectLogo?.name
                      ? projectLogo?.name
                      : "+ Add project logo"}
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
                  // onClick={(e) => handleSubmit(e)}
                  type={"submit"}
                  disabled={isSubmitting}>
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
            </form>
          )}
        </Formik>
      </div>

      <UserList isOpen={openUserList} close={closeModal} />
    </LocalizationProvider>
  );
};
