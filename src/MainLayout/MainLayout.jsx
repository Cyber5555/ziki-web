import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import { Aside } from '../components/Aside/Aside'
import './mainLayout.css'
import { Route, Routes } from 'react-router-dom'
import { Projects } from '../screens/AllProjects/Projects'
import { Project } from '../screens/Project/Project'
import { AddProject } from '../screens/AddProject/AddProject'
import { EditProject } from '../screens/EditProject/EditProject'
import { Staff } from '../screens/Staff/Staff'
import { AddStaff } from '../screens/AddStaff/AddStaff'
import { AddSprint } from '../screens/AddSprint/AddSprint'
import { NotFound } from '../screens/notFound'
import LoginPage from '../screens/LoginScreen/LoginPage'

export const MainLayout = () => {
  return (
    <div className={'Layout'}>
      {!localStorage.getItem('userToken') ? (
        <Routes>
          <Route exact path="/" Component={LoginPage} />
        </Routes>
      ) : (
        <React.Fragment>
          <Aside />
          <main>
            <Navbar />
            <div className={'MainContainer'}>
              <Routes>
                <Route exact path="/" Component={Projects} />
                <Route exact path="/Project" Component={Project} />
                <Route exact path="/AddProject" Component={AddProject} />
                <Route exact path="/EditProject" Component={EditProject} />
                <Route exact path="/Staff" Component={Staff} />
                <Route exact path="/AddStaff" Component={AddStaff} />
                <Route exact path="/AddSprint" Component={AddSprint} />
                <Route exact path="*" Component={NotFound} />
              </Routes>
            </div>
          </main>
        </React.Fragment>
      )}
    </div>
  )
}
