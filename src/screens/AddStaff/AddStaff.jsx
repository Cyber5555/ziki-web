import React, { useState } from "react";
import { BigRenderer } from "../../Components/BigRenderer/BigRenderer";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton";
import Input from "../../Components/inputs/input.jsx";
import styles from "./addStaff.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorInvite,
  inviteUserRequest,
} from "../../store/authUsersReducer/inviteUserSlice.tsx";
import {
  adminCreateNewUserRequest,
  clearCreateUserError,
} from "../../store/authUsersReducer/adminCreateNewUserSlice.tsx";

export const AddStaff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailInvite, setEmailInvite] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const {
    email_error,
    name_error,
    password_error,
    password_confirmation_error,
    stack_error,
  } = useSelector((state) => state.adminCreateNewUserSlice);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    stack: "",
  });
  const { inviteError } = useSelector((state) => state.inviteUserSlice);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
    dispatch(clearCreateUserError());
  };

  const sendInvite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(inviteUserRequest({ email: emailInvite })).then((result) => {
      if (result.payload.success) {
        navigate("/staff");
      }
    });
  };

  const handleCreateNewUser = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(
      adminCreateNewUserRequest({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        stack: formData.stack,
      })
    ).then((result) => {
      if (result.payload.success) {
        navigate("/staff");
      }
    });
  };

  return (
    <div className={styles.AddStaff}>
      <BigRenderer>
        <p>Invite user</p>
        <form onSubmit={sendInvite} style={{ marginTop: 20 }}>
          <Input
            label={"User email"}
            type="email"
            value={emailInvite}
            onChange={(e) => {
              dispatch(clearErrorInvite());
              setEmailInvite(e.target.value);
            }}
            error={inviteError.length > 0 && inviteError}
            errorMessage={inviteError}
          />

          <BlueButton
            style={{ position: "static", marginTop: 0 }}
            type="submit"
            onClick={(e) => e.stopPropagation()}>
            Send invite
          </BlueButton>
        </form>
        {/* <div className={styles.ButtonsParent}></div> */}
        <form onSubmit={handleCreateNewUser} style={{ marginTop: 40 }}>
          <Input
            label={"Name"}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            errorMessage={name_error}
            error={name_error.length > 0 && name_error}
            parentStyle={{ margin: 0 }}
          />
          <Input
            label={"Email"}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            errorMessage={email_error}
            error={email_error > 0 && email_error}
            parentStyle={{ margin: 0 }}
          />
          <Input
            label={"Password"}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            errorMessage={password_error}
            error={password_error > 0 && password_error}
            parentStyle={{ margin: 0 }}
            password={true}
            showPassword={showPassword}
            changeShowPassword={() => setShowPassword(!showPassword)}
          />
          <Input
            label={"Password confirmation"}
            type={showPasswordConfirmation ? "text" : "password"}
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            errorMessage={password_confirmation_error}
            error={
              password_confirmation_error > 0 && password_confirmation_error
            }
            parentStyle={{ margin: 0 }}
            password={true}
            showPassword={showPasswordConfirmation}
            changeShowPassword={() =>
              setShowPasswordConfirmation(!showPasswordConfirmation)
            }
          />
          <Input
            label={"Stack"}
            type="text"
            name="stack"
            value={formData.stack}
            onChange={handleChange}
            errorMessage={stack_error}
            error={stack_error > 0 && stack_error}
            parentStyle={{ margin: 0 }}
          />

          <BlueButton
            style={{ position: "static", marginTop: 9 }}
            type="submit">
            Create new user
          </BlueButton>
        </form>
      </BigRenderer>
    </div>
  );
};
