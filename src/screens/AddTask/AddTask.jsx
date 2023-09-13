import React, { useState } from "react";
import styles from "./addTask.module.css";
import { BlueButton } from "../../components/buttons/blueButton/BlueButton";
import { BigRenderer } from "../../components/BigRenderer/BigRenderer";
import FlagMarkTask from "../../assets/icons/flagMarkTask.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addProjectRequest } from "../../store/authUsersReducer/addProjectSlice";
import { ClipLoader } from "react-spinners";
import { getAllUsersRequest } from "../../store/authUsersReducer/getAllUsersSlice";
import UserList from "../../components/UserList/UserList";
import { useNavigate } from "react-router-dom";
import FileInput from "../../components/fileInput/fileInput";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [projectLogo, setProjectLogo] = useState([]);

  const [openUserList, setOpenUserList] = useState(false);
  const { isLoading, errorMessages } = useSelector(
    (state) => state.addProjectSlice
  );
  const { all_users } = useSelector((state) => state.getAllUsersSlice);

  const { selectedUsers } = useSelector((state) => state.addUserInProjectSlice);

  const handleGetImages = (images) => {
    let new_images = Object.values(images).map((image) => {
      return image;
    });
    setProjectLogo(new_images);
  };

  const removeOneImage = (image) => {
    const new_projectLogo = [...projectLogo];
    const imageIndex = projectLogo.indexOf(image);
    new_projectLogo.splice(imageIndex, 1);
    setProjectLogo(new_projectLogo);
  };

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
      })
    ).then((res) => {
      if (res.payload?.success) {
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
      <div className={styles.AddTask}>
        <BigRenderer>
          <img src={FlagMarkTask} alt="FlagMarkTask" />
          <div className={styles.Line}></div>

          <input
            className={styles.ProjectTitle}
            placeholder={"Task name"}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            type="text"
          />
          <p className={styles.ErrorMessage}>{errorMessages?.name}</p>

          <div className={styles.StartAndDeadlineParent}>
            <div className={styles.WorkingTimeParent}>
              {/* <p className={styles.WorkingTimeTitle}>Start</p> */}
              {/* <input
                className={styles.StartAndDeadlineDate}
                placeholder="13.06.2023"
              /> */}
              <DemoItem label="Start">
                <MobileDatePicker
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

          <textarea
            className={styles.ProjectDescription}
            placeholder={"Description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className={styles.ButtonsParent}>
            <FileInput
              multiple={true}
              onChange={(e) => handleGetImages(e.target.files)}
              onRemove={() => {
                setProjectLogo([]);
              }}>
              {projectLogo.length
                ? "Selected count " + projectLogo.length
                : "+ Add Photo"}
            </FileInput>
          </div>
          <div className={styles.ImagesParent}>
            {projectLogo?.map((image) => (
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

          <BlueButton
            style={{ position: "absolute", right: 20, bottom: 20 }}
            onClick={(e) => handleSubmit(e)}>
            {isLoading ? (
              <ClipLoader loading={isLoading} size={15} color="white" />
            ) : (
              "Save"
            )}
          </BlueButton>
        </BigRenderer>
      </div>

      <UserList isOpen={openUserList} close={closeModal} />
    </LocalizationProvider>
  );
};