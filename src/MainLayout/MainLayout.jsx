import React from "react";
import { Navbar } from "../components/navbar/Navbar";
import { Aside } from "../components/Aside/Aside";
import "./mainLayout.css";
import { Route, Routes } from "react-router-dom";
import { Projects } from "../screens/AllProjects/Projects";
import { AddProject } from "../screens/AddProject/AddProject";
import { EditProject } from "../screens/EditProject/EditProject";
import { Staff } from "../screens/Staff/Staff";
import { AddStaff } from "../screens/AddStaff/AddStaff";
import { AddTask } from "../screens/AddTask/AddTask";
import { NotFound } from "../screens/notFound";
import { LoginPage } from "../screens/LoginScreen/LoginPage";
import Project from "../screens/Project/Project";

export const MainLayout = () => {
  return (
    <div className={"Layout"}>
      {!localStorage.getItem("userToken") ? (
        <Routes>
          <Route exact="true" path="/" Component={LoginPage} />
        </Routes>
      ) : (
        <React.Fragment>
          <Aside />
          <main>
            <Navbar />
            <div className={"MainContainer"}>
              <Routes>
                <Route exact="true" path="/" Component={Projects} />
                <Route exact="true" path="/Project" Component={Project} />
                <Route exact="true" path="/AddProject" Component={AddProject} />
                <Route
                  exact="true"
                  path="/EditProject"
                  Component={EditProject}
                />
                <Route exact="true" path="/Staff" Component={Staff} />
                <Route exact="true" path="/AddStaff" Component={AddStaff} />
                <Route exact="true" path="/AddTask" Component={AddTask} />
                <Route exact="true" path="*" Component={NotFound} />
              </Routes>
            </div>
          </main>
        </React.Fragment>
      )}
    </div>
  );
};
