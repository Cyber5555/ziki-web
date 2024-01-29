import { useEffect, useState } from "react";
import NavbarAvatar from "../../Assets/images/NavbarAvatar.png";
import { ReactComponent as NotifyIcon } from "../../Assets/icons/notifyIcon.svg";
import { ReactComponent as SettingsIcon } from "../../Assets/icons/settingsIcon.svg";
import styles from "./navbar.module.css";
import { ReactComponent as SideBarIcon } from "../../Assets/icons/SideBarIcon.svg";
import { useLocation } from "react-router-dom";
import { NotificationsDropdown } from "../NotificationsDropdown/NotificationsDropdown";
import { useDispatch, useSelector } from "react-redux";
import { authUserDetailRequest } from "../../store/authUsersReducer/authUserDetailSlice.tsx";
import { toggleAside } from "../../store/otherSlice/openAsideSlice.tsx";
import { changeTitle } from "../../store/otherSlice/pageTitleSlice.tsx";

export const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user_data } = useSelector((state) => state.authUserDetailSlice);
  const { page_title } = useSelector((state) => state.pageTitleSlice);

  useEffect(() => {
    dispatch(authUserDetailRequest({}));
    if (location.pathname === "/") {
      dispatch(changeTitle({ title: "All Projects" }));
    } else if (location.pathname === "/staff") {
      dispatch(changeTitle({ title: "Staff" }));
    } else if (location.pathname === "/calendar") {
      dispatch(changeTitle({ title: "Calendar" }));
    } else if (location.pathname === "/chat") {
      dispatch(changeTitle({ title: "Chat" }));
    } else if (location.pathname === "/settings") {
      dispatch(changeTitle({ title: "Settings" }));
    }
  }, [location, dispatch]);

  const toggleMenuBar = () => {
    dispatch(toggleAside());
  };

  return (
    <nav className={styles.Navbar}>
      <div className={styles.LeftSide}>
        <SideBarIcon
          alt="Side Bar Icon"
          onClick={toggleMenuBar}
          style={{ cursor: "pointer" }}
        />
        <h2 className={styles.Title}>{page_title}</h2>
      </div>
      <div className={styles.NavbarRightSide}>
        {/*search*/}
        <input type="text" className={styles.Search} />

        <NotifyIcon
          style={{ cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <img
          src={user_data.avatar ? user_data.avatar : NavbarAvatar}
          alt={"Navbar Avatar"}
          className={styles.Avatar}
        />
        <SettingsIcon alt={"Settings Icon"} style={{ cursor: "pointer" }} />

        <NotificationsDropdown isOpen={isOpen} />
      </div>
    </nav>
  );
};
