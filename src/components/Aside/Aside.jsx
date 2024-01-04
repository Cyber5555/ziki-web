import React from "react";
import Ziki from "../../assets/icons/ziki.svg";
import robot_eset from "../../assets/images/robot-eset.png";
import styles from "./aside.module.css";
import ArrowRight from "../../assets/icons/arrowRight.svg";
import { Link, NavLink } from "react-router-dom";
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
        <img src={Ziki} alt={"Ziki"} />
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
          <img src={ArrowRight} alt={"ArrowRight"} />
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
          <img src={ArrowRight} alt={"ArrowRight"} />
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
          <img src={ArrowRight} alt={"ArrowRight"} />
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
          <img src={ArrowRight} alt={"ArrowRight"} />
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
          <img src={ArrowRight} alt={"ArrowRight"} />
        </NavLink>
      </ul>
    </aside>
  );
};
