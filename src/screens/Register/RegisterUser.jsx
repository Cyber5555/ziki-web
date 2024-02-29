import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import Input from "../../Components/inputs/input.jsx";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton.jsx";
import { useSelector } from "react-redux";
import FileInput from "../../Components/fileInput/fileInput.tsx";
import { ClipLoader } from "react-spinners";
import { registerUserRequest } from "../../store/authSystemReducer/registerUserSlice.tsx";

const RegisterUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    avatar: null,
    stack: "",
  });

  const [hasErrorMessage, setHasErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    stack: "",
  });

  const {
    isLoading,
    isError,
    emailError,
    passwordError,
    passwordConfirmError,
    nameError,
    avatarError,
    stackError,
  } = useSelector((state) => state.registerUserSlice);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({ ...prevData, avatar: file }));
    setHasErrorMessage({ avatar: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // dispatch(clearErrorRegisterUser());
  };

  const handleSubmitPersonalData = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      formData?.password?.trim().length > 0 &&
      formData?.email?.trim().length > 0 &&
      formData?.name?.trim().length > 0 &&
      formData?.confirmPassword?.trim().length > 0 &&
      formData?.stack?.trim().length > 0 &&
      formData?.avatar
    ) {
      dispatch(
        registerUserRequest({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          avatar: formData.avatar,
          stack: formData.stack,
        })
      )
        .then((result) => {
          if (result.payload.success) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally((e) => {
          console.log(e);
        });
    } else if (formData?.name?.trim().length === 0) {
      setHasErrorMessage({ name: "required name" });
    } else if (formData?.stack?.trim().length === 0) {
      setHasErrorMessage({ stack: "required stack" });
    } else if (formData?.email?.trim().length === 0) {
      setHasErrorMessage({ email: "required email" });
    } else if (formData?.password?.trim().length === 0) {
      setHasErrorMessage({ password: "required password" });
    } else if (formData?.confirmPassword?.trim().length === 0) {
      setHasErrorMessage({ confirmPassword: "required password confirmation" });
    } else if (formData?.avatar == null) {
      setHasErrorMessage({ avatar: "required avatar" });
    } else {
      setHasErrorMessage({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
        stack: "",
      });
    }
  };

  return (
    <>
      <div className={styles.FormParent}>
        <div className={styles.TitleParent}>
          <h1 className={styles.Title}>Z I K I</h1>
        </div>
        <div className={styles.PaddingBox}>
          <div
            className={styles.SwipeBar}
            // style={{ left: `-${swipeState}00%` }}
          >
            <form className={styles.Form} onSubmit={handleSubmitPersonalData}>
              <Input
                label="Name"
                value={formData.name}
                onChange={handleChange}
                error={nameError || hasErrorMessage.name}
                errorMessage={nameError || hasErrorMessage.name}
                name={"name"}
                // parentStyle={{ width: "100%" }}
              />
              <Input
                label="Stack"
                value={formData.stack}
                onChange={handleChange}
                error={stackError || hasErrorMessage.stack}
                errorMessage={stackError || hasErrorMessage.stack}
                name={"stack"}
                // parentStyle={{ width: "100%" }}
              />

              <Input
                label="Email"
                value={formData.email}
                onChange={handleChange}
                error={emailError || hasErrorMessage.email}
                name={"email"}
                errorMessage={emailError || hasErrorMessage.email}
                // parentStyle={{ width: "100%" }}
              />

              <Input
                label="Password"
                value={formData.password}
                onChange={handleChange}
                type={isShowPassword ? "text" : "password"}
                error={passwordError || hasErrorMessage.password}
                errorMessage={passwordError || hasErrorMessage.password}
                showPassword={isShowPassword}
                changeShowPassword={() => {
                  setIsShowPassword(!isShowPassword);
                }}
                password={true}
                name={"password"}
                parentStyle={{ width: "100%" }}
              />

              <Input
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                type={isShowPasswordConfirm ? "text" : "password"}
                error={passwordConfirmError || hasErrorMessage.confirmPassword}
                errorMessage={
                  passwordConfirmError || hasErrorMessage.confirmPassword
                }
                showPassword={isShowPasswordConfirm}
                changeShowPassword={() => {
                  setIsShowPasswordConfirm(!isShowPasswordConfirm);
                }}
                password={true}
                name={"confirmPassword"}
                parentStyle={{ width: "100%" }}
              />

              <div className={styles.FileInputParent}>
                <FileInput
                  onChange={handleFileChange}
                  onRemove={() => setFormData({ avatar: null })}
                  childeStyle={{
                    color:
                      hasErrorMessage?.avatar?.trim().length > 0 || avatarError
                        ? "#ff0000"
                        : "#6259ca",
                  }}
                  parentStyle={{
                    width: "100%",
                    height: 50,
                    justifyContent: "space-between",
                    paddingRight: 10,
                    borderColor:
                      hasErrorMessage?.avatar?.trim().length > 0 || avatarError
                        ? "#ff0000"
                        : "#6259ca",
                  }}>
                  {formData.avatar?.name
                    ? formData.avatar?.name
                    : "+ Add avatar"}
                </FileInput>
                <p className={styles.ErrorMessage}>
                  {avatarError || hasErrorMessage.avatar}
                </p>
              </div>

              <div className={styles.NextParent}>
                <BlueButton
                  type="submit"
                  onClick={(e) => {
                    // e.stopPropagation();
                  }}
                  style={{
                    position: "static",
                  }}>
                  {isLoading ? (
                    <ClipLoader loading={isLoading} size={20} color="white" />
                  ) : (
                    "Next"
                  )}
                </BlueButton>
              </div>
              {<p className={styles.ErrorMessage}>{isError}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
