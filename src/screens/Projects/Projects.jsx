/* eslint-disable array-callback-return */
import { RenderedItems } from "../../Components/RenderedItems/RenderedItems.jsx";
import styles from "./projects.module.css";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectsRequest } from "../../store/authUsersReducer/getAllProjectsSlice.tsx";
import { pusher } from "../../pusher.js";
import { ReactComponent as EditIcon } from "../../Assets/icons/editIcon.svg";

const role = localStorage.getItem("role");

const ProjectItem = ({ board, onShowAllSprints }) => {
  const navigate = useNavigate();

  return (
    <RenderedItems>
      <div className={styles.TitleParent}>
        <h2 className={styles.Title}>{board?.name}</h2>
        {role === "2" && (
          <EditIcon
            onClick={(e) => navigate(`/edit-project/${board.id}`)}
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
          onClick={() => onShowAllSprints(board.id)}>
          View all sprints (
          {board.statuses.reduce((acc, obj) => acc + obj.count, 0)})
        </p>
        <div style={{ clear: "both" }} />
        <div className={styles.CreatedUsersParent}>
          {board?.users?.map((user, userIndex) => (
            <Link
              to={`/staff/user/${user.id}`}
              className={styles.CreatedUsers}
              key={userIndex}>
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
                <p className={styles.UserNameAndDeveloperType}>{user?.name}</p>
                <p className={styles.UserNameAndDeveloperType}>
                  {user.stack} (50/15)
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </RenderedItems>
  );
};

export const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { all_project_data = [] } = useSelector(
    (state) => state.getAllProjectsSlice
  );

  useEffect(() => {
    dispatch(getAllProjectsRequest({}));
  }, [dispatch]);

  const handleShowAllSprints = useCallback(
    (boardId) => {
      navigate(`/project/${boardId}`);
    },
    [navigate]
  );
  const handlePusherError = (error) => {
    console.error("Pusher error:", error);
    // Handle the error as needed, e.g., show a user-friendly message
  };

  useEffect(() => {
    const channel = pusher.subscribe("project-list");
    const handleProjectChange = () => {
      dispatch(getAllProjectsRequest({}));
    };

    channel.bind("project.created", handleProjectChange);
    channel.bind("project.deleted", handleProjectChange);
    channel.bind("project.updated", handleProjectChange);
    channel.bind("task.assigned ", handleProjectChange);

    // Add error handling
    channel.bind("pusher:error", handlePusherError);

    return () => {
      // Clean up the subscription and error handling when the component unmounts
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [dispatch]);

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
        <BlueButton
          onClick={() => navigate("/add-project")}
          role={role === "2"}>
          + Add project
        </BlueButton>
      </div>
    );
  }

  return (
    <div className={styles.Projects}>
      {all_project_data?.map((board, index) => (
        <ProjectItem
          key={index}
          board={board}
          onShowAllSprints={handleShowAllSprints}
        />
      ))}
      <BlueButton onClick={() => navigate("/add-project")} role={role === "2"}>
        + Add project
      </BlueButton>
    </div>
  );
};
