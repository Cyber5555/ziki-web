import { useEffect, useState } from "react";
import styles from "./register.module.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../Components/inputs/input.jsx";
import { clearErrorRegister } from "../../store/authSystemReducer/registerSlice.tsx";
import { ClipLoader } from "react-spinners";
import FileInput from "../../Components/fileInput/fileInput.tsx";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton.jsx";
import { registerRequest } from "../../store/authSystemReducer/registerSlice.tsx";

const Register = () => {
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    avatar: null,
  });
  const [hasErrorMessage, setHasErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({ ...prevData, avatar: file }));
    setHasErrorMessage({ avatar: "" });
  };

  const {
    isLoading,
    isError,
    successRegister,
    emailError,
    passwordError,
    passwordConfirmError,
    nameError,
    avatarError,
  } = useSelector((state) => state.registerSlice);

  useEffect(() => {
    if (successRegister) {
      window.location.reload();
    }
  }, [isError, successRegister, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      formData?.password?.trim().length > 0 &&
      formData?.email?.trim().length > 0 &&
      formData?.name?.trim().length > 0 &&
      formData?.confirmPassword?.trim().length > 0 &&
      formData?.avatar
    ) {
      dispatch(
        registerRequest({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          avatar: formData.avatar,
        })
      );
    } else if (formData?.name?.trim().length === 0) {
      setHasErrorMessage({ name: "required name" });
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
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    dispatch(clearErrorRegister());
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrorRegister());
    };
  }, [dispatch]);

  return (
    <div>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <h1 className={styles.Title}>Z I K I</h1>
        <Input
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={nameError || hasErrorMessage.name}
          errorMessage={nameError || hasErrorMessage.name}
          name={"name"}
        />

        <Input
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={emailError || hasErrorMessage.email}
          name={"email"}
          errorMessage={emailError || hasErrorMessage.email}
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
        />

        <Input
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          type={isShowPasswordConfirm ? "text" : "password"}
          error={passwordConfirmError || hasErrorMessage.confirmPassword}
          errorMessage={passwordConfirmError || hasErrorMessage.confirmPassword}
          showPassword={isShowPasswordConfirm}
          changeShowPassword={() => {
            setIsShowPasswordConfirm(!isShowPasswordConfirm);
          }}
          password={true}
          name={"confirmPassword"}
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
            {formData.avatar?.name ? formData.avatar?.name : "+ Add avatar"}
          </FileInput>
          <p className={styles.ErrorMessage}>
            {avatarError || hasErrorMessage.avatar}
          </p>
        </div>

        <BlueButton
          type="submit"
          onClick={(e) => e.stopPropagation()}
          style={{ width: 100, marginTop: 30, position: "static" }}>
          {isLoading ? (
            <ClipLoader loading={isLoading} size={20} color="white" />
          ) : (
            "Sign In"
          )}
        </BlueButton>
        {<p className={styles.ErrorMessage}>{isError}</p>}
      </form>
    </div>
  );
};

export default Register;
