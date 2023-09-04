import React from 'react'
import styles from './addSprint.module.css'
import { BorderButton } from '../../components/buttons/borderButton/BorderButton'
import { BlueButton } from '../../components/buttons/blueButton/BlueButton'
import { BigRenderer } from '../../components/BigRenderer/BigRenderer'

export const AddSprint = () => {
  return (
    <div className={styles.AddSprint}>
      <BigRenderer>
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
        <div className={styles.Line}></div>
        <textarea className={styles.ProjectTitle} placeholder={'Projects name'} />
        <textarea className={styles.ProjectDescription} placeholder={'Projects description'} />

        <div className={styles.ButtonsParent}>
          <BorderButton>+ Add project logo</BorderButton>
          <BorderButton>+ Add project tz</BorderButton>
          <BorderButton>+ Add project design</BorderButton>
          <BorderButton>+ Add project logoStatus project</BorderButton>
        </div>
        <BlueButton style={{ position: 'static', marginTop: 12 }}>+ Add user</BlueButton>
        <BlueButton style={{ position: 'absolute', right: 20, bottom: 20 }}>Save</BlueButton>
      </BigRenderer>
    </div>
  )
}
