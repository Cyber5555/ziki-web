/* eslint-disable react/prop-types */
import styles from './renderedItems.module.css'

export const RenderedItems = ({ children, style, onDragOver, onDrop }) => {
  return (
    <div className={styles.RenderedItems} style={style} onDragOver={onDragOver} onDrop={onDrop}>
      {children}
    </div>
  )
}
