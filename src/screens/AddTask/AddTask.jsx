import React, { useState } from "react";
import styles from "./addTask.module.css";
import { Formik } from "formik";
import { BlueButton } from "../../components/buttons/blueButton/BlueButton";
import { BigRenderer } from "../../components/BigRenderer/BigRenderer";
import FlagMarkTask from "../../assets/icons/flagMarkTask.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { getAllUsersRequest } from "../../store/authUsersReducer/getAllUsersSlice.tsx";
import UserList from "../../components/UserList/UserList";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "../../components/fileInput/fileInput";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { addTaskRequest } from "../../store/authUsersReducer/addTaskSlice.tsx";

export const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { board_id } = useParams();
  const [taskImages, setTaskImages] = useState([]);
  const [openUserList, setOpenUserList] = useState(false);
  const { isLoading, errorMessages } = useSelector(
    (state) => state.addTaskSlice
  );
  const { all_users } = useSelector((state) => state.getAllUsersSlice);

  const { selectedUsers } = useSelector((state) => state.addUserInProjectSlice);

  const handleGetImages = (images) => {
    let new_images = Object.values(images).map((image) => {
      return image;
    });
    setTaskImages(new_images);
  };

  const removeOneImage = (image) => {
    const new_projectLogo = [...taskImages];
    const imageIndex = taskImages.indexOf(image);
    new_projectLogo.splice(imageIndex, 1);
    setTaskImages(new_projectLogo);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     addTaskRequest({
  //       name: taskName,
  //       project_id: board_id,
  //       description,
  //       status_id: localStorage.getItem("status_id"),
  //       start_date: moment(startDate).format("DD.MM.YYYY"),
  //       end_date: moment(endDate).format("DD.MM.YYYY"),
  //       image: taskImages,
  //       taskName,
  //       user_ids: selectedUsers,
  //     })
  //   ).then((res) => {
  //     if (res.payload?.success) {
  //       navigate("/project", {
  //         replace: true,
  //       });
  //     }
  //   });
  // };

  const openModal = () => {
    setOpenUserList(true);
    dispatch(getAllUsersRequest({}));
  };

  const closeModal = () => {
    setOpenUserList(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className={styles.AddTask}>
        <Formik
          initialValues={{
            description: "",
            taskName: "",
            startDate: moment(new Date()).format("DD.MM.YYYY"),
            endDate: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.taskName) {
              errors.taskName = "Required";
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
              addTaskRequest({
                name: values.taskName,
                project_id: board_id,
                description: values.description,
                status_id: localStorage.getItem("status_id"),
                start_date: values.startDate,
                end_date: moment(values.endDate).format("DD.MM.YYYY"),
                image: taskImages,
                taskName: values.taskName,
                user_ids: selectedUsers,
              })
            ).then((res) => {
              if (res.payload?.success) {
                navigate(`/project/${board_id}`, {
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
          }) => (
            <BigRenderer>
              <form onSubmit={handleSubmit}>
                <img src={FlagMarkTask} alt="FlagMarkTask" />
                <div className={styles.Line}></div>
                <input
                  className={styles.ProjectTitle}
                  placeholder={"Task name"}
                  value={values.taskName}
                  onChange={handleChange}
                  type="text"
                  name="taskName"
                />
                <p className={styles.ErrorMessage}>
                  {errorMessages?.name ||
                    (errors.taskName && touched.taskName && errors.taskName)}
                </p>

                <div className={styles.StartAndDeadlineParent}>
                  <div className={styles.WorkingTimeParent}>
                    <DemoItem label="Start">
                      <MobileDatePicker
                        className={styles.StartAndDeadlineDate}
                        format="DD.MM.YYYY"
                        onChange={(date) =>
                          handleChange({
                            target: { name: "startDate", value: date },
                          })
                        }
                        defaultValue={moment(new Date())}
                        // value={values.startDate}
                        name="startDate"
                      />
                    </DemoItem>
                  </div>
                  <div className={styles.WorkingTimeParent}>
                    <DemoItem label="Deadline">
                      <MobileDatePicker
                        className={styles.StartAndDeadlineDate}
                        format="DD.MM.YYYY"
                        onChange={(date) =>
                          handleChange({
                            target: { name: "endDate", value: date },
                          })
                        }
                        // value={values.endDate}
                        name="endDate"
                      />
                    </DemoItem>
                  </div>
                </div>

                <textarea
                  className={styles.ProjectDescription}
                  placeholder={"Description"}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="description"
                />

                <div className={styles.ButtonsParent}>
                  <FileInput
                    multiple={true}
                    onChange={(e) => handleGetImages(e.target.files)}
                    onRemove={() => {
                      setTaskImages([]);
                    }}>
                    {taskImages.length
                      ? "Selected count " + taskImages.length
                      : "+ Add Photo"}
                  </FileInput>
                </div>
                <div className={styles.ImagesParent}>
                  {taskImages?.map((image) => (
                    <div
                      className={styles.SelectedImagesParent}
                      key={image.name}>
                      <div className={styles.ImageName}>
                        <img
                          src={URL.createObjectURL(image)}
                          className={styles.Image}
                          alt={image.name}
                          loading="lazy"
                        />
                        <p>{image.name}</p>
                      </div>
                      <span
                        className={styles.RemoveFile}
                        onClick={() => removeOneImage(image)}>
                        <DeleteOutlineIcon />
                      </span>
                    </div>
                  ))}
                </div>

                <BlueButton
                  type={"button"}
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

                <div className={styles.UsersParent}>
                  <h2 className={styles.UsersTitle}>Users</h2>
                  {/* <img src={EditIcon} alt="Edit Icon" style={{ cursor: "pointer" }} /> */}
                </div>

                <div className={styles.UsersList}>
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
                </div>

                <BlueButton
                  style={{ position: "absolute", right: 20, bottom: 20 }}
                  type={"submit"}
                  disabled={isSubmitting}>
                  {isLoading ? (
                    <ClipLoader loading={isLoading} size={15} color="white" />
                  ) : (
                    "Save"
                  )}
                </BlueButton>
              </form>
            </BigRenderer>
          )}
        </Formik>
      </div>
      <UserList isOpen={openUserList} close={closeModal} />
    </LocalizationProvider>
  );
};
