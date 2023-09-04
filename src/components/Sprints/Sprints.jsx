/* eslint-disable react/prop-types */
import styles from './sprints.module.css'

export const Sprints = ({ id, title }) => {
  return (
    <div className={styles.Sprints}>
      <h3 className={styles.Title}>
        Sprint {id} - {title} 2
      </h3>
      <p className={styles.SprintText}>
        project short description ; project short description ; project short description
      </p>
    </div>
  )
}
