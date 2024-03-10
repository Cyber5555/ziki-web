// Import necessary libraries and components
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { ReactComponent as Ziki } from "../../Assets/icons/ziki.svg";
import { ReactComponent as ArrowRight } from "../../Assets/icons/arrowRight.svg";
import { logoutRequest } from "../../store/authSystemReducer/logoutSlice.tsx";
import { useDispatch, useSelector } from "react-redux";
import styles from "./aside.module.css";
import robot_eset from "../../Assets/images/robot-eset.png";

// Reusable SidebarLink component
const SidebarLink = ({ to, label, icon, routes }) => {
  const location = useLocation();
  const { isOpenAside } = useSelector((state) => state.openAsideSlice);

  const isActive = () => {
    if (to === "/" && location.pathname === "/") {
      return true;
    }

    const routeMatch = routes.some((route) =>
      location.pathname.startsWith(route)
    );
    return routeMatch;
  };

  return (
    <NavLink
      to={to}
      className={`${styles.SideBarList} ${isActive() ? styles.active : ""}`}>
      <span
        className={`${styles.SideBarIcons} ${
          !isOpenAside ? styles.opened : ""
        }`}>
        {icon}
        {label}
      </span>
      <ArrowRight />
    </NavLink>
  );
};

// Main Aside component
const Aside = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpenAside } = useSelector((state) => state.openAsideSlice);

  const logout = () => {
    dispatch(logoutRequest())
      .then((action) => {
        const response = action.payload;
        if (response.success) {
          localStorage.clear();
          navigate("/", { replace: true });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <aside className={styles.Aside}>
      <div className={styles.SideBarHeader}>
        <img src={robot_eset} className={styles.RobotEset} alt="robot_eset" />
        <Ziki />
      </div>

      <ul className={styles.SideBarUl}>
        <SidebarLink
          to="/staff"
          label="Staff"
          icon={<PeopleRoundedIcon />}
          routes={["/staff", "/add-staff", "/staff/user/"]}
        />
        <SidebarLink
          to="/"
          label="Project"
          icon={<AccountTreeRoundedIcon />}
          routes={["/project", "/add-project", "/edit-project", "/add-task"]}
        />
        <SidebarLink
          to="/calendar"
          label="Calendar"
          icon={<CalendarMonthRoundedIcon />}
          routes={["/calendar"]}
        />
        <SidebarLink
          to="/chat"
          label="Chat"
          icon={<MessageRoundedIcon />}
          routes={["/chat"]}
        />
        <SidebarLink
          to="/settings"
          label="Settings Company"
          icon={<SettingsSuggestRoundedIcon />}
          routes={["/settings"]}
        />

        <p onClick={logout} className={styles.SideBarList}>
          <span
            className={`${styles.SideBarIcons} ${
              !isOpenAside ? styles.opened : ""
            }`}>
            <ExitToAppOutlinedIcon />
            Logout
          </span>
        </p>
      </ul>
    </aside>
  );
};
export default Aside;
