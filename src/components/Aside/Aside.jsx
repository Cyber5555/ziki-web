import React from "react";
import { ReactComponent as Ziki } from "../../Assets/icons/ziki.svg";
import robot_eset from "../../Assets/images/robot-eset.png";
import styles from "./aside.module.css";
import { ReactComponent as ArrowRight } from "../../Assets/icons/arrowRight.svg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";

export const Aside = () => {
  const { isOpenAside } = useSelector((state) => state.openAsideSlice);

  return (
    <aside className={styles.Aside}>
      <div className={styles.SideBarHeader}>
        <img src={robot_eset} className={styles.RobotEset} alt="robot_eset" />
        <Ziki />
      </div>

      <ul className={styles.SideBarUl}>
        <NavLink
          to={"/staff"}
          className={({ isActive }) =>
            `${styles.SideBarList} ${isActive ? styles.active : ""}`
          }>
          <span
            className={`${styles.SideBarIcons} ${
              !isOpenAside ? styles.opened : ""
            }`}>
            <PeopleRoundedIcon />
            Staff
          </span>
          <ArrowRight />
        </NavLink>

        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `${styles.SideBarList} ${isActive ? styles.active : ""}`
          }>
          <span
            className={`${styles.SideBarIcons} ${
              !isOpenAside ? styles.opened : ""
            }`}>
            <AccountTreeRoundedIcon />
            Project
          </span>
          <ArrowRight />
        </NavLink>

        <NavLink
          to={"/calendar"}
          className={({ isActive }) =>
            `${styles.SideBarList} ${isActive ? styles.active : ""}`
          }>
          <span
            className={`${styles.SideBarIcons} ${
              !isOpenAside ? styles.opened : ""
            }`}>
            <CalendarMonthRoundedIcon />
            Calendar
          </span>
          <ArrowRight />
        </NavLink>

        <NavLink
          to={"/chat"}
          className={({ isActive }) =>
            `${styles.SideBarList} ${isActive ? styles.active : ""}`
          }>
          <span
            className={`${styles.SideBarIcons} ${
              !isOpenAside ? styles.opened : ""
            }`}>
            <MessageRoundedIcon />
            Chat
          </span>
          <ArrowRight />
        </NavLink>

        <NavLink
          to={"/settings"}
          className={({ isActive }) =>
            `${styles.SideBarList} ${isActive ? styles.active : ""}`
          }>
          <span
            className={`${styles.SideBarIcons} ${
              !isOpenAside ? styles.opened : ""
            }`}>
            <SettingsSuggestRoundedIcon />
            Settings
          </span>
          <ArrowRight />
        </NavLink>
      </ul>
    </aside>
  );
};
