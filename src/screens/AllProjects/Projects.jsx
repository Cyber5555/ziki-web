import { RenderedItems } from "../../components/RenderedItems/RenderedItems";
import styles from "./projects.module.css";
import { BlueButton } from "../../components/buttons/blueButton/BlueButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectsRequest } from "../../store/authUsersReducer/getAllProjectsSlice";
import Pusher from "pusher-js";

export const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { all_project_data } = useSelector(
    (state) => state.getAllProjectsSlice
  );

  let pusher = new Pusher("ee8b67274fccf540b81e", {
    appId: "1651282",
    secret: "0cbc75cacff02b16b2c9",
    cluster: "ap2",
    // encrypted: true,
  });

  const channel = pusher.subscribe("project-list");

  channel.bind("project.created", function (data) {
    dispatch(getAllProjectsRequest({}));
    return data;
  });

  useEffect(() => {
    dispatch(getAllProjectsRequest({}));
  }, [dispatch]);

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
            <p
              className={styles.ShowAllSprints}
              onClick={() => {
                localStorage.setItem("idea", board.id);
                // dispatch(getProjectColumnRequest({ id: board.id }));
                navigate("/Project");
              }}>
              View all sprints (85)
            </p>
            <div className={styles.CreatedUsersParent}>
              {board?.users?.map((user, $$$) => (
                <div className={styles.CreatedUsers} key={$$$}>
                  <div className={styles.UserNameFirstLatterOrImage}>
                    {user?.name[0]}
                  </div>
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
