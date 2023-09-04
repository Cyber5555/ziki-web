import { useState } from 'react'
import { RenderedItems } from '../../components/RenderedItems/RenderedItems'
import FlagMark from '../../assets/icons/flagMark.svg'
import styles from './project.module.css'
import taskStyles from '../../components/Tasks/tasks.module.css'
import { Tasks } from '../../components/Tasks/Tasks'

export const Project = () => {
  const [boards, setBoards] = useState([
    {
      id: '1',
      title: 'charvac',
      items: [
        { id: '1', title: 'go to kuxnia' },
        { id: '2', title: 'go to padval' },
        { id: '3', title: 'go to zal' }
      ]
    },
    {
      id: '2',
      title: 'arvum e',
      items: [
        { id: '1', title: 'go to boxsi' },
        { id: '2', title: 'go to trinajor' },
        { id: '3', title: 'go to barba' }
      ]
    },
    {
      id: '3',
      title: 'patrast e',
      items: [
        { id: '1', title: 'go to pari' },
        { id: '2', title: 'go to bangladesh' },
        { id: '3', title: 'go to market' }
      ]
    }
  ])
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  function dragOverHandler(e) {
    e.preventDefault()

    if (e.target.className == taskStyles.Tasks) {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dropHandler(e, board, item) {
    e.target.style.boxShadow = 'none'
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard?.items.splice(currentIndex, 1)
    const dropIndex = board?.items.indexOf(item)
    currentBoard.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(
      boards.map((b) => {
        if (b?.id === board?.id) {
          return board
        }
        if (b?.id === currentBoard?.id) {
          return currentBoard
        }
        return b
      })
    )
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard?.items.splice(currentIndex, 1)
    setBoards(
      boards.map((b) => {
        if (b?.id === board?.id) {
          return board
        }
        if (b?.id === currentBoard?.id) {
          return currentBoard
        }
        return b
      })
    )
  }

  return (
    <div className={styles.Project}>
      {boards.map((board, $) => (
        <RenderedItems
          key={$}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
        >
          <h2 className={styles.Title}>
            {board.title} <span className={styles.SubTitle}>({board.items.length})</span>
          </h2>
          <div className={styles.Line}></div>
          <div className={styles.Tasks}>
            <div className={styles.TaskName}>
              <p>
                Task name Task name Task name Task name Task name Task name Task name Task name Task
                name
              </p>
              <img src={FlagMark} alt="FlagMark" />
            </div>
            <h3 className={styles.Complates}>Complate</h3>
            <div className={styles.SprintsParent}>
              {board.items.map((item, $$) => (
                <div
                  key={$$}
                  draggable={true}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragStart={(e) => dragStartHandler(e, board, item)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e)}
                >
                  <Tasks id={item.id} title={item.title} />
                </div>
              ))}
            </div>
            <div className={styles.CreatedUsersParent}>
              {new Array(3).fill(null).map((_, $$) => (
                <div className={styles.CreatedUsers} key={$$}>
                  <div className={styles.UserNameFirstLatterOrImage}>A</div>
                  <div>
                    <p className={styles.UserNameAndDeveloperType}>Armen Vardanyan</p>
                    <p className={styles.UserNameAndDeveloperType}>Front-end (50/15)</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.WorkTime}>
              <p className={styles.StartAndDeadline}>Start 13.06.2023</p>
              <p className={styles.StartAndDeadline}>Deadline 13.06.2023</p>
            </div>
          </div>
        </RenderedItems>
      ))}
    </div>
  )
}
