import React, { useState } from "react";
import styles from "./personalSettings.module.css";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton.jsx";
import Input from "../../Components/inputs/input.jsx";
import { useDispatch } from "react-redux";
import {
  clearErrorUpdatePassword,
  updatePasswordRequest,
} from "../../store/authUsersReducer/updatePasswordSlice.tsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PersonalSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoadingUpdatePassword,
    old_password_error,
    password_error,
    password_confirmation_error,
  } = useSelector((state) => state.updatePasswordSlice);
  const [formData, setFormData] = useState({
    email: "",
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    password: false,
    password_confirmation: false,
  });

  const handleChangeData = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    dispatch(clearErrorUpdatePassword());
  };

  const handleShowPassword = (name) => {
    setShowPassword((prevShowPassword) => {
      const updatedState = {
        ...prevShowPassword,
        [name]: !prevShowPassword[name],
      };

      return updatedState;
    });
  };

  const handleSubmitData = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      updatePasswordRequest({
        old_password: formData.old_password,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      })
    ).then((result) => {
      if (result.payload.success) {
        navigate("/");
        window.location.reload();
      }
    });
  };

  return (
    <div className={styles.PersonalSettings}>
      <form className={styles.PersonalSettingsForm} onSubmit={handleSubmitData}>
        {/* <Input
          type="email"
          parentStyle={InputParentStyle}
          label={"Email"}
          error={""}
          errorMessage={""}
          name={"email"}
          value={formData.email}
          onChange={handleChangeData}
        /> */}
        <Input
          type={showPassword.old_password ? "text" : "password"}
          parentStyle={InputParentStyle}
          label={"Old Password"}
          changeShowPassword={() => handleShowPassword("old_password")}
          error={old_password_error?.length > 0 && old_password_error}
          errorMessage={old_password_error}
          showPassword={showPassword.old_password}
          password={true}
          name={"old_password"}
          value={formData.old_password}
          onChange={handleChangeData}
        />

        <Input
          type={showPassword.password ? "text" : "password"}
          parentStyle={InputParentStyle}
          label={"New Password"}
          changeShowPassword={() => handleShowPassword("password")}
          error={password_error?.length > 0 && password_error}
          errorMessage={password_error}
          showPassword={showPassword.password}
          password={true}
          name={"password"}
          value={formData.password}
          onChange={handleChangeData}
        />
        <Input
          type={showPassword.password_confirmation ? "text" : "password"}
          parentStyle={InputParentStyle}
          label={"Password Confirmation"}
          changeShowPassword={() => handleShowPassword("password_confirmation")}
          error={
            password_confirmation_error?.length > 0 &&
            password_confirmation_error
          }
          errorMessage={password_confirmation_error}
          showPassword={showPassword.password_confirmation}
          password={true}
          name={"password_confirmation"}
          value={formData.password_confirmation}
          onChange={handleChangeData}
        />
        <BlueButton type="submit" disabled={isLoadingUpdatePassword}>
          Save
        </BlueButton>
      </form>
    </div>
  );
};

const InputParentStyle = {
  width: 300,
};

export default PersonalSettings;
