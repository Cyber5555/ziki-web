import React, { useEffect, useState } from "react";
import styles from "./personalPage.module.css";
import { Avatar, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { ReactComponent as EditIcon } from "../../Assets/icons/editIcon.svg";
import { organizationDetailsRequest } from "../../store/authUsersReducer/organizationDetailsSlice.tsx";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton.jsx";
import { updateOrganizationDetailsRequest } from "../../store/authUsersReducer/updateOrganizationDetailsSlice.tsx";
import { BorderButton } from "../../Components/buttons/borderButton/BorderButton.jsx";

const role = localStorage.getItem("role");

const PersonalPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user_data } = useSelector((state) => state.authUserDetailSlice);
  const { organization_data } = useSelector(
    (state) => state.organizationDetailsSlice
  );
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [company_name, setCompanyName] = useState("");

  useEffect(() => {
    if (role === "2") {
      dispatch(organizationDetailsRequest());
    }
  }, [dispatch]);

  useEffect(() => {
    setName(user_data.name);
    setCompanyName(organization_data.name);
  }, [organization_data.name, user_data.avatar, user_data.name]);

  const submitChanges = () => {
    dispatch(
      updateOrganizationDetailsRequest({
        name: name,
        logo: logo.sent,
        company_name: company_name,
      })
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Convert the file to a URL or base64 string
      const imageUrl = URL.createObjectURL(file);
      setLogo({ show: imageUrl, send: file });
    }
  };

  return (
    <div className={styles.PersonalPage}>
      <div className={styles.TopPersonData}>
        <Tooltip title="Click for change avatar" arrow>
          <div className={styles.AvatarParent}>
            <label htmlFor="avatarInput">
              <Avatar
                src={logo?.show || user_data.avatar}
                alt={user_data.name}
                sx={{ width: 100, height: 100 }}
              />
            </label>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              aria-label="Choose avatar"
              style={{
                visibility: "visible",
                opacity: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                zIndex: 1,
                cursor: "pointer",
              }}
              onChange={handleFileChange}
            />
          </div>
        </Tooltip>
        <div className={styles.UserWrapper}>
          <Tooltip title="Click for change name" arrow>
            <input
              className={styles.Inputs}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Tooltip>
          <Tooltip title="Click for change stack" arrow>
            <input
              className={styles.Inputs}
              value={organization_data?.owner?.stack}
              onChange={(e) => setName(e.target.value)}
              placeholder="Stack"
            />
          </Tooltip>
        </div>
      </div>

      {role === "2" && (
        <div className={styles.CompanyDataParent}>
          <p>Company information</p>
          <div className={styles.CompanyDataWrapper}>
            <Tooltip title="Click for change company name" arrow>
              <input
                className={styles.Inputs}
                value={organization_data?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </Tooltip>
            {/* <Tooltip title="Click for change company name" arrow>
              <input
                className={styles.Inputs}
                value={organization_data?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </Tooltip> */}
          </div>
          <BorderButton
            style={{
              borderColor: "red",
              color: "red",
              marginTop: 10,
            }}>
            Remove Organization
          </BorderButton>
        </div>
      )}
      <BlueButton onClick={submitChanges}>Save</BlueButton>
    </div>
  );
};

export default PersonalPage;
