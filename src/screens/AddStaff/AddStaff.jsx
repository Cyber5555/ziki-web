import React from 'react'
import { BigRenderer } from '../../components/BigRenderer/BigRenderer'
import { BlueButton } from '../../components/buttons/blueButton/BlueButton'
import styles from './addStaff.module.css'

export const AddStaff = () => {
  return (
    <div className={styles.AddStaff}>
      <BigRenderer>
        <input className={styles.StaffName} placeholder={'Projects name'} />
        <div className={styles.ButtonsParent}>
          <BlueButton style={{ position: 'static' }}>+ Add Position</BlueButton>
          <BlueButton style={{ position: 'static' }}>+ Add Project</BlueButton>
        </div>
        <BlueButton style={{ position: 'absolute', right: 20, bottom: 20 }}>Save</BlueButton>
      </BigRenderer>
    </div>
  )
}
