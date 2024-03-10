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
import { updateProfileRequest } from "../../store/authUsersReducer/updateProfileSlice.tsx";

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
  const [formData, setFormData] = useState({
    name: "",
    stack: "",
    email: "",
  });

  useEffect(() => {
    if (role === "2") {
      dispatch(organizationDetailsRequest());
    }
  }, [dispatch]);

  useEffect(() => {
    setName(organization_data?.name);
    setFormData({
      name: user_data.name,
      email: user_data.email,
      stack: user_data.stack,
    });
  }, [organization_data?.name, user_data]);

  const submitCompanyChanges = () => {
    dispatch(
      updateOrganizationDetailsRequest({
        name: name,
        logo: logo,
      })
    );
  };
  const submitUserChanges = () => {
    dispatch(
      updateProfileRequest({
        name: formData.name,
        avatar: logo,
        email: formData.email,
        stack: formData.stack,
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

  const handleChangeProfile = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
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
              value={formData.name}
              onChange={handleChangeProfile}
              name="name"
            />
          </Tooltip>
          <Tooltip title="Click for change stack" arrow>
            <input
              className={styles.Inputs}
              value={organization_data?.owner?.stack}
              onChange={handleChangeProfile}
              placeholder="Stack"
              name="stack"
            />
          </Tooltip>
          <Tooltip title="Click for change email" arrow>
            <input
              className={styles.Inputs}
              value={organization_data?.owner?.stack}
              onChange={handleChangeProfile}
              placeholder="Email"
              type="email"
              name="email"
            />
          </Tooltip>
        </div>
        <BlueButton onClick={submitUserChanges} style={{ position: "static" }}>
          Save
        </BlueButton>
      </div>

      {role === "2" && (
        <div className={styles.CompanyDataParent}>
          <p>Company information</p>
          <div className={styles.CompanyDataWrapper}>
            <Tooltip title="Click for change company name" arrow>
              <input
                className={styles.Inputs}
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </Tooltip>
          </div>
          <BorderButton
            style={{
              borderColor: "red",
              color: "red",
              marginTop: 10,
            }}>
            Remove Organization
          </BorderButton>
          <BlueButton
            onClick={submitCompanyChanges}
            style={{ position: "static" }}>
            Save
          </BlueButton>
        </div>
      )}
    </div>
  );
};

export default PersonalPage;
