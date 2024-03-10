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
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { ClipLoader } from "react-spinners";
import { singleProjectRequest } from "../../store/authUsersReducer/singleProjectSlice.tsx";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { BorderButton } from "../../Components/buttons/borderButton/BorderButton.jsx";
import { removeProjectRequest } from "../../store/authUsersReducer/removeProjectSlice.tsx";
import { toggleSelectUser } from "../../store/otherSlice/addUserInProjectSlice.tsx";
import { editProjectRequest } from "../../store/authUsersReducer/editProjectSlice.tsx";
import { staffListRequest } from "../../store/authUsersReducer/staffListSlice.tsx";

export const EditProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { project_id } = useParams();
  const { single_data } = useSelector((state) => state.singleProjectSlice);
  const { selectedUsers } = useSelector((state) => state.addUserInProjectSlice);
  const { isLoadingRemove } = useSelector((state) => state.removeProjectSlice);
  const [isEditProject, setIsEditProject] = useState(false);

  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
  });
  const [projectLogo, setProjectLogo] = useState(null);
  const [projectTZ, setProjectTZ] = useState(null);

  const [openUserList, setOpenUserList] = useState(false);
  const { isLoading, errorMessages } = useSelector(
    (state) => state.editProjectSlice
  );
  console.log("📢 [EditProject.jsx:46]", selectedUsers);
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(singleProjectRequest(project_id));
      if (response.payload?.success) {
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
          users?.map((user) => dispatch(toggleSelectUser(user)))
        );

        // Now you can safely access selectedUsers
      }
    };

    fetchData();
  }, [dispatch, project_id]);

  const openModal = () => {
    setOpenUserList(true);
    dispatch(staffListRequest());
  };

  const closeModal = () => setOpenUserList(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const removeProject = () => {
    dispatch(removeProjectRequest(project_id)).then((result) => {
      if (result.payload.success) {
        navigate("/", { replace: true });
      }
    });
  };

  // const toggleFavorite = async (event, item) => {
  //   event.stopPropagation();

  //   const isProductInFavorites = single_data.users.some(
  //     (user) => user.id === item.id
  //   );

  //   try {
  //     if (isProductInFavorites) {
  //       const fav = single_data.users.filter(
  //         (favorite) => favorite.id !== item.id
  //       );
  //       setIsFavorite(fav);
  //       localStorage.setItem("favorites", JSON.stringify(fav));
  //     } else {
  //       setIsFavorite([...isFavorite, item]);
  //       localStorage.setItem(
  //         "favorites",
  //         JSON.stringify([...isFavorite, item])
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error toggling favorite:", error);
  //   }
  // };

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginBottom: 10,
                }}>
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsEditProject(!isEditProject)}
                />
              </div>
              <div className={styles.PageTitleParent}>
                <input
                  className={styles.PageTitle}
                  value={formData.projectName}
                  placeholder="Project"
                  name="projectName"
                  onChange={handleChange}
                  disabled={!isEditProject}
                />
              </div>
              <div className={styles.StartAndDeadlineMainParent}>
                <div className={styles.WorkingTimeParent}>
                  <DemoItem label="Start">
                    <MobileDatePicker
                      className={styles.StartAndDeadlineDate}
                      format="YYYY-MM-DD"
                      onChange={(e) => setStartDate(e)}
                      value={startDate}
                      disabled={!isEditProject}
                      minDate={moment(new Date())}
                    />
                  </DemoItem>
                  {/* <p className={styles.ErrorMessage}></p> */}
                </div>
                <div className={styles.WorkingTimeParent}>
                  <DemoItem label="Deadline">
                    <MobileDatePicker
                      className={styles.StartAndDeadlineDate}
                      format="YYYY-MM-DD"
                      onChange={(e) => setEndDate(e)}
                      value={endDate}
                      disabled={!isEditProject}
                      minDate={moment(new Date())}
                    />
                  </DemoItem>
                  {/* <p className={styles.ErrorMessage}></p> */}
                </div>
              </div>

              <h2 className={styles.DescriptionTitle}>Description</h2>

              <TextareaAutosize
                className={styles.Description}
                aria-label="empty textarea"
                placeholder="Empty"
                disabled={!isEditProject}
                name="description"
                value={formData.description || single_data?.description}
                onChange={handleChange}
                // defaultValue={single_data?.description}
              />

              {single_data?.project_logo || projectLogo || isEditProject ? (
                <h2 className={styles.ProjectLogoTitle}>Project logo</h2>
              ) : null}

              {isEditProject ? (
                <FileInput
                  parentStyle={{
                    margin: "13px 9px",
                  }}
                  onChange={(e) => {
                    setProjectLogo(e.target.files[0]);
                  }}
                  onRemove={() => {
                    setProjectLogo(null);
                  }}>
                  {projectLogo?.name || "+ Add project logo"}
                </FileInput>
              ) : single_data?.project_logo || projectLogo ? (
                <img
                  src={single_data?.project_logo || projectLogo}
                  alt="Project Logo"
                  className={styles.ProjectLogo}
                />
              ) : null}

              {single_data?.project_tz || projectTZ || isEditProject ? (
                <h2 className={styles.ProjectTZTitle}>Project TZ</h2>
              ) : null}

              {isEditProject ? (
                <FileInput
                  parentStyle={{
                    margin: "13px 9px",
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

              <h2 className={styles.UsersTitle}>Users</h2>
              {isEditProject && (
                <BorderButton style={{ margin: 9 }} onClick={openModal}>
                  Edit users
                </BorderButton>
              )}
              {selectedUsers.map((user, index) => (
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
                      {user?.stack} (50/15)
                    </p>
                  </div>
                </div>
              ))}
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
      <UserList
        isOpen={openUserList}
        close={closeModal}
        editingUsers={single_data?.users}
      />
    </LocalizationProvider>
  );
};
