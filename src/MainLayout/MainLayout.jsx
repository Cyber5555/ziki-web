import React from "react";
import { Navbar } from "../Components/navbar/Navbar";
import { Aside } from "../Components/Aside/Aside";
import styles from "./mainLayout.module.css";
import { Route, Routes } from "react-router-dom";
import { Projects } from "../Screens/Projects/Projects";
import { AddProject } from "../Screens/AddProject/AddProject";
import { EditProject } from "../Screens/EditProject/EditProject";
import { Staff } from "../Screens/Staff/Staff";
import { AddStaff } from "../Screens/AddStaff/AddStaff";
import { AddTask } from "../Screens/AddTask/AddTask";
import { LoginPage } from "../Screens/Login/LoginPage";
import Project from "../Screens/Project/Project";
import { useSelector } from "react-redux";
import { NotFound } from "../Screens/NotFound";
import Register from "../Screens/Register/Register";

export const MainLayout = () => {
  const { isOpenAside } = useSelector((state) => state.openAsideSlice);

  return (
    <div className={`${styles.Layout} ${isOpenAside ? styles.active : ""}`}>
      {!localStorage.getItem("userToken") ? (
        <Routes>
          <Route exact="true" path="/" Component={LoginPage} />
          <Route exact="true" path="/register" Component={Register} />
          <Route path="*" Component={NotFound} />
        </Routes>
      ) : (
        <React.Fragment>
          <Aside />
          <main>
            <Navbar />
            <div className={styles.MainContainer}>
              <Routes>
                <Route path="/">
                  <Route exace index Component={Projects} />
                  <Route path="/project/:board_id" Component={Project} />
                  <Route path="/add-project" Component={AddProject} />
                  <Route
                    path="/edit-project/:project_id"
                    Component={EditProject}
                  />
                  <Route path="/staff" Component={Staff} />
                  <Route path="/add-staff" Component={AddStaff} />
                  <Route path="/add-task/:board_id" Component={AddTask} />
                </Route>
                <Route path="*" Component={NotFound} />
              </Routes>
            </div>
          </main>
        </React.Fragment>
      )}
    </div>
  );
};
