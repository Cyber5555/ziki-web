import { useEffect, useState } from 'react'
import NavbarAvatar from '../../assets/images/NavbarAvatar.png'
import NotifyIcon from '../../assets/icons/notifyIcon.svg'
import SettingsIcon from '../../assets/icons/settingsIcon.svg'
import styles from './navbar.module.css'
import SideBarIcon from '../../assets/icons/SideBarIcon.svg'
import { useLocation } from 'react-router-dom'
import { NotificationsDropdown } from '../NotificationsDropdown/NotificationsDropdown'

export const Navbar = () => {
  const location = useLocation()
  const [pageTitle, setPageTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (location.pathname == '/') {
      setPageTitle('All Projects')
    } else if (location.pathname == '/Project') {
      setPageTitle('Project')
    } else if (location.pathname == '/AddProject') {
      setPageTitle('Add Project')
    }
  }, [location])

  const toggleMenuBar = () => {
    document.querySelector('.Layout').classList.toggle('active')
  }

  return (
    <nav className={styles.Navbar}>
      <div className={styles.LeftSide}>
        <img
          src={SideBarIcon}
          alt="Side Bar Icon"
          onClick={toggleMenuBar}
          style={{ cursor: 'pointer' }}
        />
        <h2 className={styles.Title}>{pageTitle}</h2>
      </div>
      <div className={styles.NavbarRightSide}>
        {/*search*/}
        <input type="text" className={styles.Search} />

        <img
          src={NotifyIcon}
          alt={'Notification Icon'}
          style={{ cursor: 'pointer' }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <img src={NavbarAvatar} alt={'Navbar Avatar'} className={styles.Avatar} />
        <img src={SettingsIcon} alt={'Settings Icon'} style={{ cursor: 'pointer' }} />

        <NotificationsDropdown isOpen={isOpen} />
      </div>
    </nav>
  )
}
