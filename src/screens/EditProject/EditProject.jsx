import React, { useEffect, useState } from "react";
import styles from "./editProject.module.css";
import moment from "moment";
import UserList from "../../Components/UserList/UserList.jsx";
import FileInput from "../../Components/fileInput/fileInput.tsx";
import { BigRenderer } from "../../Components/BigRenderer/BigRenderer";
import { ReactComponent as EditIcon } from "../../Assets/icons/editIcon.svg";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllUsersRequest } from "../../store/authUsersReducer/getAllUsersSlice.tsx";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { ClipLoader } from "react-spinners";
import { singleProjectRequest } from "../../store/authUsersReducer/singleProjectSlice.tsx";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { BorderButton } from "../../Components/buttons/borderButton/BorderButton.jsx";
import { removeProjectRequest } from "../../store/authUsersReducer/removeProjectSlice.tsx";
import { toggleSelectUser } from "../../store/otherSlice/addUserInProjectSlice.tsx";
import { editProjectRequest } from "../../store/authUsersReducer/editProjectSlice.tsx";

export const EditProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { project_id } = useParams();
  const { single_data } = useSelector((state) => state.singleProjectSlice);
  const { selectedUsers } = useSelector((state) => state.addUserInProjectSlice);
  const { isLoadingRemove } = useSelector((state) => state.removeProjectSlice);

  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
  });
  const [projectLogo, setProjectLogo] = useState(null);
  const [projectTZ, setProjectTZ] = useState(null);

  const [isEditName, setIsEditName] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);
  const [isEditDate, setIsEditDate] = useState(false);
  const [isEditProjectLogo, setIsEditProjectLogo] = useState(false);
  const [isEditProjectTZ, setIsEditProjectTZ] = useState(false);

  const [openUserList, setOpenUserList] = useState(false);
  const { isLoading, errorMessages } = useSelector(
    (state) => state.editProjectSlice
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(singleProjectRequest(project_id));
      if (response.payload.success) {
        const { name, description, users, start_date, end_date } =
          response.payload?.payload;

        setFormData({
          projectName: name,
          description: description,
        });
        setStartDate(moment(start_date));
        setEndDate(moment(end_date));

        // Wait for all user selections to be dispatched before accessing selectedUsers
        await Promise.all(
          users?.map((user) => dispatch(toggleSelectUser(user.id)))
        );

        // Now you can safely access selectedUsers
      }
    };

    fetchData();
  }, [dispatch, project_id]);

  const openModal = () => {
    setOpenUserList(true);
    dispatch(getAllUsersRequest({}));
  };

  const closeModal = () => {
    setOpenUserList(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const removeProject = () => {
    dispatch(removeProjectRequest(project_id)).then((result) => {
      if (result.payload.success) {
        navigate(-1);
      }
    });
  };

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(
      editProjectRequest({
        project_id,
        projectName: formData.projectName,
        users: selectedUsers,
        projectLogo,
        projectTZ,
        description: formData.description,
        startDate,
        endDate,
      })
    ).then((result) => {
      if (result.payload.success) {
        navigate(-1);
      }
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className={styles.EditProject}>
        <BigRenderer>
          <form onSubmit={handleSubmit} className={styles.Form}>
            <div className={styles.ScrollBox}>
              <div className={styles.PageTitleParent}>
                <input
                  className={styles.PageTitle}
                  value={formData.projectName}
                  placeholder="Project"
                  name="projectName"
                  onChange={handleChange}
                  disabled={!isEditName}
                />
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsEditName(!isEditName)}
                />
              </div>
              <div className={styles.StartAndDeadlineMainParent}>
                <div className={styles.StartAndDeadlineParent}>
                  <div className={styles.WorkingTimeParent}>
                    <DemoItem label="Start">
                      <MobileDatePicker
                        // defaultValue={moment(new Date())}
                        className={styles.StartAndDeadlineDate}
                        format="YYYY-MM-DD"
                        onChange={(e) => setStartDate(e)}
                        value={startDate}
                        disabled={!isEditDate}
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
                        disabled={!isEditDate}
                      />
                    </DemoItem>
                    <p className={styles.ErrorMessage}>
                      {/* {errorMessages?.name ||
                    (errors.endDate && touched.endDate && errors.endDate)} */}
                    </p>
                  </div>
                </div>
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsEditDate(!isEditDate)}
                />
              </div>
              <div className={styles.DescriptionTitleParent}>
                <h2 className={styles.DescriptionTitle}>Description</h2>
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsEditDescription(!isEditDescription)}
                />
              </div>
              <TextareaAutosize
                className={styles.Description}
                aria-label="empty textarea"
                placeholder="Empty"
                disabled={!isEditDescription}
                name="description"
                value={formData.description}
                onChange={handleChange}
                defaultValue={single_data?.description}
              />

              <div className={styles.ProjectLogoParent}>
                <h2 className={styles.ProjectLogoTitle}>Project logo</h2>
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsEditProjectLogo(!isEditProjectLogo)}
                />
              </div>
              {isEditProjectLogo ? (
                <FileInput
                  parentStyle={{
                    marginTop: 13,
                  }}
                  onChange={(e) => {
                    setProjectLogo(e.target.files[0]);
                  }}
                  onRemove={() => {
                    setProjectLogo(null);
                  }}>
                  {projectLogo?.name || "+ Add project logo"}
                </FileInput>
              ) : (
                <img
                  src={single_data?.project_logo || projectLogo}
                  alt="Project Logo"
                  className={styles.ProjectLogo}
                />
              )}

              <div className={styles.ProjectTZParent}>
                <h2 className={styles.ProjectTZTitle}>Project TZ</h2>
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsEditProjectTZ(!isEditProjectTZ)}
                />
              </div>
              {isEditProjectTZ ? (
                <FileInput
                  parentStyle={{
                    marginTop: 13,
                  }}
                  onChange={(e) => {
                    setProjectTZ(e.target.files[0]);
                  }}
                  onRemove={() => {
                    setProjectTZ(null);
                  }}>
                  {projectTZ?.name ? projectTZ?.name : "+ Add project tz"}
                </FileInput>
              ) : (
                <a
                  href={single_data?.project_tz || projectTZ}
                  target="_blank"
                  className={styles.ProjectTZ}
                  rel="noreferrer">
                  {single_data?.project_tz || projectTZ}
                </a>
              )}

              <p className={styles.ErrorMessage}>
                <br />
                <br />
                {errorMessages?.project_logo}
                <br />
                {errorMessages?.project_tz}
              </p>

              <div className={styles.UsersParent}>
                <h2 className={styles.UsersTitle}>Users</h2>
                <EditIcon style={{ cursor: "pointer" }} onClick={openModal} />
              </div>

              {single_data?.users?.map(
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
            <div className={styles.ButtonsParent}>
              <BorderButton
                style={{ borderColor: "red", color: "red" }}
                onClick={removeProject}
                type={"submit"}
                disabled={isLoading}>
                {isLoadingRemove ? (
                  <ClipLoader loading={isLoadingRemove} size={15} color="red" />
                ) : (
                  "Remove Project"
                )}
              </BorderButton>
              <BlueButton
                style={{ position: "static", right: 20, bottom: 20 }}
                onClick={(e) => e.stopPropagation()}
                type={"submit"}
                disabled={isLoading}>
                {isLoading ? (
                  <ClipLoader loading={isLoading} size={15} color="white" />
                ) : (
                  "Save"
                )}
              </BlueButton>
            </div>
          </form>
        </BigRenderer>
      </div>
      <UserList isOpen={openUserList} close={closeModal} />
    </LocalizationProvider>
  );
};
