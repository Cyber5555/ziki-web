import React, { useState } from "react";
import { BigRenderer } from "../../Components/BigRenderer/BigRenderer";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton";
import styles from "./addStaff.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearErrorInvite,
  inviteUserRequest,
} from "../../store/authUsersReducer/inviteUserSlice.tsx";
import { useSelector } from "react-redux";

export const AddStaff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailInvite, setEmailInvite] = useState("");
  const [formData, setFormData] = useState({});
  const { inviteError } = useSelector((state) => state.inviteUserSlice);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
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

  return (
    <div className={styles.AddStaff}>
      <BigRenderer>
        <p>Invite user</p>
        <form onSubmit={sendInvite}>
          <input
            className={styles.StaffName}
            placeholder={"User email"}
            value={emailInvite}
            onChange={(e) => {
              dispatch(clearErrorInvite());
              setEmailInvite(e.target.value);
            }}
            type="email"
          />
          <p className={styles.ErrorMessage}>{inviteError}</p>
          <BlueButton
            style={{ position: "static", marginTop: 9 }}
            type="submit"
            onClick={(e) => e.stopPropagation()}>
            Send invite
          </BlueButton>
        </form>
        {/* <div className={styles.ButtonsParent}></div> */}
        <form onSubmit={null} style={{ marginTop: 40 }}>
          <input
            className={styles.StaffName}
            placeholder={"Name"}
            value={formData.name}
            onChange={handleChange}
            type="text"
            name="name"
          />
          <input
            className={styles.StaffName}
            placeholder={"Email"}
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
          />
          <input
            className={styles.StaffName}
            placeholder={"Password"}
            value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
          />
          <input
            className={styles.StaffName}
            placeholder={"Password confirmation"}
            value={formData.passwordConfirm}
            onChange={handleChange}
            type="password"
            name="passwordConfirm"
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
