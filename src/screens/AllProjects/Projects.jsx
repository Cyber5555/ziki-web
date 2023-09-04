import { RenderedItems } from "../../components/RenderedItems/RenderedItems";
import styles from "./projects.module.css";
import { BlueButton } from "../../components/buttons/blueButton/BlueButton";
import { Sprints } from "../../components/Sprints/Sprints";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectsRequest } from "../../store/authUsersReducer/getAllProjectsSlice";

export const Projects = () => {
  const dispatch = useDispatch();
  const { isLoading, all_project_data } = useSelector(
    (state) => state.getAllProjectsSlice
  );

  useEffect(() => {
    dispatch(getAllProjectsRequest({}));
  }, []);

  return (
    <div className={styles.Projects}>
      {all_project_data?.map((board, $) => (
        <RenderedItems key={$}>
          <Link to={"/EditProject"}>
            <h2 className={styles.Title}>{board?.name}</h2>
          </Link>
          <p className={styles.Status}>Status - Stoped</p>
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
            {/* {board?.statuses?.map((task, $$) => (
              <Sprints key={$$} title={task?.name} />
            ))} */}
            <Link to={"/Project"} className={styles.ShowAllSprints}>
              View all sprints (85)
            </Link>
            <div className={styles.CreatedUsersParent}>
              {board?.users?.map((user, $$$) => (
                <div className={styles.CreatedUsers} key={$$$}>
                  <div className={styles.UserNameFirstLatterOrImage}>A</div>
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
      <BlueButton to={"/AddProject"}>+ Add project</BlueButton>
    </div>
  );
};
