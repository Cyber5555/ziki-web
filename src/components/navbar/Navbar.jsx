import { useEffect, useState } from "react";
import { ReactComponent as NotifyIcon } from "../../Assets/icons/notifyIcon.svg";
import { ReactComponent as SettingsIcon } from "../../Assets/icons/settingsIcon.svg";
import styles from "./navbar.module.css";
import { ReactComponent as SideBarIcon } from "../../Assets/icons/SideBarIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationsDropdown } from "../NotificationsDropdown/NotificationsDropdown";
import { useDispatch, useSelector } from "react-redux";
import { authUserDetailRequest } from "../../store/authUsersReducer/authUserDetailSlice.tsx";
import { toggleAside } from "../../store/otherSlice/openAsideSlice.tsx";
import { changeTitle } from "../../store/otherSlice/pageTitleSlice.tsx";
import { Avatar, Badge, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
const role = localStorage.getItem("role");

export const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user_data } = useSelector((state) => state.authUserDetailSlice);
  const { page_title } = useSelector((state) => state.pageTitleSlice);

  const toggleMenuBar = () => dispatch(toggleAside());
  const goToSettings = () => navigate("/personal-settings");
  const goToPersonalProfile = () => navigate("/personal-page");

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
    } else if (location.pathname === "/personal-page") {
      dispatch(changeTitle({ title: "Personal page" }));
    } else if (location.pathname === "/personal-settings") {
      dispatch(changeTitle({ title: "Personal Settings" }));
    }
  }, [location, dispatch]);

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
        <input
          type="text"
          className={styles.Search}
          value={""}
          onChange={null}
        />

        <Tooltip title={"Center notification"} arrow>
          <NotifyIcon
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(!isOpen)}
          />
        </Tooltip>
        <Tooltip
          title={
            role === "2"
              ? "Personal and company information"
              : "Personal information"
          }
          arrow>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot">
            <Avatar
              src={user_data?.avatar}
              alt={user_data.name}
              className={styles.Avatar}
              sx={{ width: 34, height: 34 }}
              onClick={goToPersonalProfile}
            />
          </StyledBadge>
        </Tooltip>
        <Tooltip title={"Personal settings"} arrow>
          <SettingsIcon style={{ cursor: "pointer" }} onClick={goToSettings} />
        </Tooltip>
        <NotificationsDropdown isOpen={isOpen} />
      </div>
    </nav>
  );
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
