import React from "react";
import styles from "./mainLayout.module.css";
import { Navbar } from "../Components/navbar/Navbar";
import { Aside } from "../Components/Aside/Aside";
import { Route, Routes } from "react-router-dom";
import { Projects } from "../Screens/Projects/Projects";
import { AddProject } from "../Screens/AddProject/AddProject";
import { EditProject } from "../Screens/EditProject/EditProject";
import { Staff } from "../Screens/Staff/Staff";
import { AddStaff } from "../Screens/AddStaff/AddStaff";
import { AddTask } from "../Screens/AddTask/AddTask";
import { LoginPage } from "../Screens/Login/LoginPage";
import { useSelector } from "react-redux";
import { NotFound } from "../Screens/NotFound";
import Project from "../Screens/Project/Project";
import Register from "../Screens/Register/Register";
import RegisterUser from "../Screens/Register/RegisterUser";
import PersonalPage from "../Screens/Personal/PersonalPage";
import PersonalSettings from "../Screens/Personal/PersonalSettings";
import DeveloperPersonalPage from "../Screens/Staff/DeveloperPersonalPage";

export const MainLayout = () => {
  const { isOpenAside } = useSelector((state) => state.openAsideSlice);

  return (
    <div className={`${styles.Layout} ${isOpenAside ? styles.active : ""}`}>
      {!localStorage.getItem("userToken") ? (
        <Routes>
          <Route exact="true" path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <React.Fragment>
          <Aside />
          <main>
            <Navbar />
            <div className={styles.MainContainer}>
              <Routes>
                <Route path="/">
                  <Route exact index element={<Projects />} />
                  <Route path="/project/:project_id" element={<Project />} />
                  <Route path="/add-project" element={<AddProject />} />
                  <Route
                    path="/edit-project/:project_id"
                    element={<EditProject />}
                  />
                  <Route path="/staff" element={<Staff />} />
                  <Route
                    path="/staff/:userId"
                    element={<DeveloperPersonalPage />}
                  />
                  <Route path="/add-staff" element={<AddStaff />} />
                  <Route path="/add-task/:project_id" element={<AddTask />} />
                  <Route path="/personal-page" element={<PersonalPage />} />
                  <Route
                    path="/personal-settings"
                    element={<PersonalSettings />}
                  />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </React.Fragment>
      )}
    </div>
  );
};
