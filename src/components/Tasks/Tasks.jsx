/* eslint-disable react/prop-types */
import styles from './tasks.module.css'

export const Tasks = ({ id, title }) => {
  return (
    <div
      className={styles.Tasks}
      onMouseOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <h3 className={styles.Title}>
        Tasks {id} - {title} 2
      </h3>
      <p className={styles.TaskText}>
        project short description ; project short description ; project short description
      </p>
    </div>
  )
}
