import React, { useState } from "react";
import styles from "./addTask.module.css";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton.jsx";
import { BigRenderer } from "../../Components/BigRenderer/BigRenderer.jsx";
import { ReactComponent as FlagMarkTask } from "../../Assets/icons/flagMarkTask.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import UserList from "../../Components/UserList/UserList.jsx";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "../../Components/fileInput/fileInput.tsx";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { addTaskRequest } from "../../store/authUsersReducer/addTaskSlice.tsx";
import { staffListRequest } from "../../store/authUsersReducer/staffListSlice.tsx";
import { assignUserRequest } from "../../store/authUsersReducer/assignUserSlice.tsx";

export const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { project_id } = useParams();
  const [taskImages, setTaskImages] = useState([]);
  const [openUserList, setOpenUserList] = useState(false);
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(null);
  const { isLoading, errorMessages } = useSelector(
    (state) => state.addTaskSlice
  );

  const [formData, setFormData] = useState({
    description: "",
    taskName: "",
  });

  const { selectedUsers } = useSelector((state) => state.addUserInProjectSlice);

  const handleGetImages = (images) => {
    let new_images = Object.values(images)?.map((image) => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(assignUserRequest({}));
    dispatch(
      addTaskRequest({
        name: formData.taskName,
        project_id,
        description: formData.description,
        status_id: localStorage.getItem("status_id"),
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        image: taskImages,
        taskName: formData.taskName,
        user_ids: selectedUsers,
      })
    ).then((res) => {
      if (res.payload?.success) {
        navigate(`/project/${project_id}`, {
          replace: true,
        });
      }
    });
  };

  const openModal = () => {
    setOpenUserList(true);
    dispatch(staffListRequest());
  };

  const closeModal = () => setOpenUserList(false);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className={styles.AddTask}>
        <BigRenderer>
          <div className={styles.ScrollableBox}>
            <form onSubmit={handleSubmit}>
              <FlagMarkTask />
              <div className={styles.Line}></div>
              <input
                className={styles.ProjectTitle}
                placeholder={"Task name"}
                value={formData.taskName}
                onChange={handleChange}
                type="text"
                name="taskName"
              />
              <p className={styles.ErrorMessage}>
                {/* {errorMessages?.name ||
                (errors.taskName && touched.taskName && errors.taskName)} */}
              </p>

              <div className={styles.StartAndDeadlineParent}>
                <div className={styles.WorkingTimeParent}>
                  <DemoItem label="Start">
                    <MobileDatePicker
                      className={styles.StartAndDeadlineDate}
                      format="YYYY-MM-DD"
                      onChange={(date) => setStartDate(date)}
                      value={startDate}
                      minDate={moment(new Date())}
                    />
                  </DemoItem>
                </div>
                <div className={styles.WorkingTimeParent}>
                  <DemoItem label="Deadline">
                    <MobileDatePicker
                      className={styles.StartAndDeadlineDate}
                      format="YYYY-MM-DD"
                      onChange={(date) => setEndDate(date)}
                      value={endDate}
                      minDate={moment(new Date())}
                    />
                  </DemoItem>
                </div>
              </div>

              <textarea
                className={styles.ProjectDescription}
                placeholder={"Description"}
                value={formData.description}
                onChange={handleChange}
                // onBlur={handleBlur}
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
                  <div className={styles.SelectedImagesParent} key={image.name}>
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
              </div>

              <div className={styles.UsersList}>
                {selectedUsers?.map((user, index) => (
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
                        Front-end (50/15)
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <BlueButton
                style={{ position: "absolute", right: 20, bottom: 20 }}
                type={"submit"}
                disabled={isLoading}>
                {isLoading ? (
                  <ClipLoader loading={isLoading} size={15} color="white" />
                ) : (
                  "Save"
                )}
              </BlueButton>
            </form>
          </div>
        </BigRenderer>
      </div>
      <UserList isOpen={openUserList} close={closeModal} />
    </LocalizationProvider>
  );
};
