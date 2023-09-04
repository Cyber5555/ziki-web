/* eslint-disable react/prop-types */
import styles from './notificationsDropdown.module.css'
import { Link } from 'react-router-dom'

export const NotificationsDropdown = ({ isOpen }) => {
  return (
    <div className={isOpen ? styles.NotificationsBoxActive : styles.NotificationsBox}>
      <h2 className={styles.Title}>Notifications</h2>
      <div className={styles.Line}></div>

      {new Array(3).fill(null).map((_, $) => (
        <div className={styles.Tasks} key={$}>
          <h2 className={styles.TaskTitle}>Task name</h2>

          <div className={styles.WorkingTime}>
            <p className={styles.StartAndDeadline}>Start 13.06.2023</p>
            <p className={styles.StartAndDeadline}>Deadline 13.06.2023</p>
          </div>

          <div className={styles.ShowMoreParent}>
            <Link to={''} className={styles.ShowMore}>
              View task
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
