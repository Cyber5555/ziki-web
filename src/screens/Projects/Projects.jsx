/* eslint-disable array-callback-return */
import { RenderedItems } from "../../Components/RenderedItems/RenderedItems.jsx";
import styles from "./projects.module.css";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton.jsx";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectsRequest } from "../../store/authUsersReducer/getAllProjectsSlice.tsx";
import { pusher } from "../../pusher.js";
import { ReactComponent as EditIcon } from "../../Assets/icons/editIcon.svg";

const role = localStorage.getItem("role");

export const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { all_project_data = [] } = useSelector(
    (state) => state.getAllProjectsSlice
  );

  useEffect(() => {
    dispatch(getAllProjectsRequest({}));
  }, [dispatch]);

  const channel = pusher.subscribe("project-list");
  channel.bind("project.created", function (data) {
    // dispatch(getAllProjectsRequest({}));
    channel.unbind("project.created");
    channel.unbind_global("project.created");
    channel.unbind_all("project.created");
    return data;
  });

  const handleShowAllSprints = (boardId) => {
    navigate(`/project/${boardId}`);
  };

  if (all_project_data?.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <p>you are not a project</p>
        <BlueButton onClick={() => navigate("/add-project")}>
          + Add project
        </BlueButton>
      </div>
    );
  }

  return (
    <div className={styles.Projects}>
      {all_project_data?.map((board, index) => (
        <RenderedItems key={index}>
          <div className={styles.TitleParent}>
            <h2 className={styles.Title}>{board?.name}</h2>
            {role === "2" && (
              <EditIcon
                onClick={() => navigate(`/edit-project/${board.id}`)}
                className={styles.EditIcon}
              />
            )}
          </div>
          <p className={styles.Status}>Status - Stopped</p>
          <p className={styles.TaskInfo}>{board?.description}</p>

          <div className={styles.StartEndTimeWork}>
            <p className={styles.StartEnd}>Lunch {board?.start_date}</p>
            <p className={styles.StartEnd}>End {board?.end_date}</p>
          </div>
          <progress
            className={styles.Progress}
            value={board?.progress}
            max={100}></progress>
          <div className={styles.SprintsParent}>
            <p
              className={styles.ShowAllSprints}
              onClick={() => handleShowAllSprints(board.id)}>
              View all sprints (
              {board.statuses.reduce((acc, obj) => acc + obj.count, 0)})
            </p>
            <div style={{ clear: "both" }} />
            <div className={styles.CreatedUsersParent}>
              {board?.users?.map((user, userIndex) => (
                <div className={styles.CreatedUsers} key={userIndex}>
                  <p className={styles.UserNameFirstLatterOrImage}>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.avatar}
                        className={styles.Avatar}
                      />
                    ) : (
                      <>
                        {user?.name[0]} {user?.name?.split(" ")[1][0]}
                      </>
                    )}
                  </p>
                  <div>
                    <p className={styles.UserNameAndDeveloperType}>
                      {user?.name}
                    </p>
                    <p className={styles.UserNameAndDeveloperType}>
                      Front-end (50/15)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RenderedItems>
      ))}
      <BlueButton onClick={() => navigate("/add-project")}>
        + Add project
      </BlueButton>
    </div>
  );
};
