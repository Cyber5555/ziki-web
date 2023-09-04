/* eslint-disable react/prop-types */
import styles from './bigRenderer.module.css'

export const BigRenderer = (props) => {
  return <div className={styles.BigRenderer}>{props.children}</div>
}
