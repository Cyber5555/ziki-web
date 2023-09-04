import React from 'react'

import Ziki from '../../assets/icons/ziki.svg'
import robot_eset from '../../assets/images/robot-eset.png'
import styles from './aside.module.css'
import ArrowRight from '../../assets/icons/arrowRight.svg'
import { Link } from 'react-router-dom'

export const Aside = () => {
  return (
    <aside className={styles.Aside}>
      <div className={styles.SideBarHeader}>
        <img src={robot_eset} className={styles.RobotEset} alt='robot_eset'/>
        <img src={Ziki} alt={'Ziki'} />
      </div>

      <ul className={styles.SideBarUl}>
        <Link to={'/'}>
          <li className={styles.SideBarList}>Home</li>
        </Link>

        <Link to={'/Staff'}>
          <li className={`${styles.SideBarList} ${styles.List2}`}>
            Staff
            <img src={ArrowRight} alt={'ArrowRight'} />
          </li>
        </Link>

        <Link to={'/'}>
          <li className={`${styles.SideBarList} ${styles.List2}`}>
            Project
            <img src={ArrowRight} alt={'ArrowRight'} />
          </li>
        </Link>

        <Link to={'/Calendar'}>
          <li className={`${styles.SideBarList} ${styles.List2}`}>
            Calendar
            <img src={ArrowRight} alt={'ArrowRight'} />
          </li>
        </Link>

        <Link to={'/Chat'}>
          <li className={`${styles.SideBarList} ${styles.List2}`}>
            Chat
            <img src={ArrowRight} alt={'ArrowRight'} />
          </li>
        </Link>

        <Link to={'/Settings'}>
          <li className={`${styles.SideBarList} ${styles.List2}`}>
            Settings
            <img src={ArrowRight} alt={'ArrowRight'} />
          </li>
        </Link>
      </ul>
    </aside>
  )
}
