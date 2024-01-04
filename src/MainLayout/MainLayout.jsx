import React from "react";
import { Navbar } from "../components/navbar/Navbar";
import { Aside } from "../components/Aside/Aside";
import styles from "./mainLayout.module.css";
import { Route, Routes } from "react-router-dom";
import { Projects } from "../screens/Projects/Projects";
import { AddProject } from "../screens/AddProject/AddProject";
import { EditProject } from "../screens/EditProject/EditProject";
import { Staff } from "../screens/Staff/Staff";
import { AddStaff } from "../screens/AddStaff/AddStaff";
import { AddTask } from "../screens/AddTask/AddTask";

import { LoginPage } from "../screens/LoginScreen/LoginPage";
import Project from "../screens/Project/Project";
import { useSelector } from "react-redux";
import { NotFound } from "../screens/NotFound";

export const MainLayout = () => {
  const { isOpenAside } = useSelector((state) => state.openAsideSlice);

  return (
    <div className={`${styles.Layout} ${isOpenAside ? styles.active : ""}`}>
      {!localStorage.getItem("userToken") ? (
        <Routes>
          <Route exact="true" path="/" Component={LoginPage} />
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
                  <Route path="/edit-project" Component={EditProject} />
                  <Route path="/staff" Component={Staff} />
                  <Route path="/add-staff" Component={AddStaff} />
                  <Route path="/add-task" Component={AddTask} />
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
