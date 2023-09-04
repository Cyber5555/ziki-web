import React from 'react'
import styles from './editProject.module.css'
import { BigRenderer } from '../../components/BigRenderer/BigRenderer'
import EditIcon from '../../assets/icons/editIcon.svg'
import ProjectLogo from '../../assets/images/projectLogo.png'
import { BlueButton } from '../../components/buttons/blueButton/BlueButton'

export const EditProject = () => {
  return (
    <div className={styles.EditProject}>
      <BigRenderer>
        <div className={styles.PageTitleParent}>
          <h2 className={styles.PageTitle}>Project</h2>
          <img src={EditIcon} alt="Edit Icon" style={{ cursor: 'pointer' }} />
        </div>
        <div className={styles.StartAndDeadlineMainParent}>
          <div className={styles.StartAndDeadlineParent}>
            <div className={styles.WorkingTimeParent}>
              <p className={styles.WorkingTimeTitle}>Start</p>
              <p className={styles.StartAndDeadlineDate}>13.06.2023</p>
            </div>
            <div className={styles.WorkingTimeParent}>
              <p className={styles.WorkingTimeTitle}>Deadline</p>
              <p className={styles.StartAndDeadlineDate}>dd.mm.yyyy</p>
            </div>
          </div>
          <img src={EditIcon} alt="Edit Icon" style={{ cursor: 'pointer' }} />
        </div>
        <div className={styles.DescriptionTitleParent}>
          <h2 className={styles.DescriptionTitle}>Description</h2>
          <img src={EditIcon} alt="Edit Icon" style={{ cursor: 'pointer' }} />
        </div>

        <p className={styles.Description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
        <div className={styles.ProjectLogoParent}>
          <h2 className={styles.ProjectLogoTitle}>Project logo</h2>
          <img src={EditIcon} alt="Edit Icon" style={{ cursor: 'pointer' }} />
        </div>

        <img src={ProjectLogo} alt="Project Logo" className={styles.ProjectLogo} />

        <div className={styles.ProjectTZParent}>
          <h2 className={styles.ProjectTZTitle}>Project TZ</h2>
          <img src={EditIcon} alt="Edit Icon" style={{ cursor: 'pointer' }} />
        </div>
        <p className={styles.ProjectTZ}>Документ Microsoft Word.dox</p>

        <div className={styles.UsersParent}>
          <h2 className={styles.UsersTitle}>Users</h2>
          <img src={EditIcon} alt="Edit Icon" style={{ cursor: 'pointer' }} />
        </div>

        {new Array(3).fill(null).map((_, $$) => (
          <div className={styles.CreatedUsers} key={$$}>
            <div className={styles.UserNameFirstLatterOrImage}>A</div>
            <div>
              <p className={styles.UserNameAndDeveloperType}>Armen Vardanyan</p>
              <p className={styles.UserNameAndDeveloperType}>Front-end (50/15)</p>
            </div>
          </div>
        ))}
        <BlueButton style={{ position: 'absolute', right: 20, bottom: 20 }}>Save</BlueButton>
      </BigRenderer>
    </div>
  )
}
