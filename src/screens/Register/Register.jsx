import { useEffect, useState } from "react";
import styles from "./register.module.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../Components/inputs/input.jsx";
import { clearErrorRegister } from "../../store/authSystemReducer/registerSlice.tsx";
import { ClipLoader } from "react-spinners";
import FileInput from "../../Components/fileInput/fileInput.tsx";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton.jsx";
import { registerRequest } from "../../store/authSystemReducer/registerSlice.tsx";
import { useNavigate } from "react-router-dom";
import { ArrowBack, ArrowRightAlt } from "@mui/icons-material";
import {
  clearErrorCreateCompany,
  createCompanyRequest,
} from "../../store/authSystemReducer/createCompanySlice.tsx";

const Register = () => {
  const [swipeState, setSwipeState] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const [id, setId] = useState(null);

  const pageNavigation = (e) => {
    e.preventDefault();

    if (swipeState === 0) {
      navigate(-1);
    } else if (swipeState === 1) {
      setSwipeState(0);
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    avatar: null,
    companyName: "",
    companyLogo: null,
  });

  const [hasErrorMessage, setHasErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    companyName: "",
    companyLogo: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({ ...prevData, avatar: file }));
    setHasErrorMessage({ avatar: "" });
  };

  const handleFileChangeCompany = (e) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({ ...prevData, companyLogo: file }));
    setHasErrorMessage({ companyLogo: "" });
  };

  const {
    isLoading,
    isError,
    emailError,
    passwordError,
    passwordConfirmError,
    nameError,
    avatarError,
  } = useSelector((state) => state.registerSlice);

  const {
    isLoadingCreateCompany,
    isErrorCreateCompany,
    companyNameError,
    companyLogoError,
  } = useSelector((state) => state.createCompanySlice);

  // useEffect(() => {
  //   if (successRegister) {
  //     // navigate("/", { replace: true });
  //   }
  // }, [isError, successRegister, dispatch, navigate]);

  const handleSubmitPersonalData = async (e) => {
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
      )
        .then((result) => {
          if (result.payload.success) {
            setSwipeState(1);
            setId(result.payload.payload.id);
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

  const handleSubmitCompanyData = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (formData?.companyName?.trim().length > 0 && formData?.companyLogo) {
      dispatch(
        createCompanyRequest({
          name: formData.companyName,
          logo: formData.companyLogo,
          organization_owner_id: id,
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
    } else if (formData?.companyName?.trim().length === 0) {
      setHasErrorMessage({ companyName: "required company name" });
    } else if (formData?.companyLogo == null) {
      setHasErrorMessage({ companyLogo: "required logo" });
    } else {
      setHasErrorMessage({
        companyName: "",
        companyLogo: "",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    dispatch(clearErrorRegister());
    dispatch(clearErrorCreateCompany());
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrorRegister());
      dispatch(clearErrorCreateCompany());
    };
  }, [dispatch]);

  return (
    <>
      <div className={styles.FormParent}>
        <div className={styles.TitleParent}>
          <ArrowBack style={{ cursor: "pointer" }} onClick={pageNavigation} />
          <h1 className={styles.Title}>Z I K I</h1>
        </div>
        <div className={styles.PaddingBox}>
          <div
            className={styles.SwipeBar}
            style={{ left: `-${swipeState}00%` }}>
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
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}>
                  {isLoading ? (
                    <ClipLoader loading={isLoading} size={20} color="white" />
                  ) : (
                    <>
                      Next <ArrowRightAlt />
                    </>
                  )}
                </BlueButton>
              </div>
              {<p className={styles.ErrorMessage}>{isError}</p>}
            </form>

            <form className={styles.Form} onSubmit={handleSubmitCompanyData}>
              <Input
                label="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                error={companyNameError || hasErrorMessage.companyName}
                errorMessage={companyNameError || hasErrorMessage.companyName}
                name={"companyName"}
                parentStyle={{ width: "100%" }}
              />

              <div className={styles.FileInputParent}>
                <FileInput
                  onChange={handleFileChangeCompany}
                  onRemove={() => setFormData({ companyLogo: null })}
                  childeStyle={{
                    color:
                      hasErrorMessage?.companyLogo?.trim().length > 0 ||
                      companyLogoError
                        ? "#ff0000"
                        : "#6259ca",
                  }}
                  parentStyle={{
                    width: "100%",
                    height: 50,
                    justifyContent: "space-between",
                    paddingRight: 10,
                    borderColor:
                      hasErrorMessage?.companyLogo?.trim().length > 0 ||
                      companyLogoError
                        ? "#ff0000"
                        : "#6259ca",
                  }}>
                  {formData.companyLogo?.name
                    ? formData.companyLogo?.name
                    : "+ Add Company Logo"}
                </FileInput>
                <p className={styles.ErrorMessage}>
                  {companyLogoError || hasErrorMessage.companyLogo}
                </p>
              </div>

              <div className={styles.NextParent}>
                <BlueButton
                  type="submit"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{
                    width: 100,
                    marginTop: 30,
                    position: "static",
                  }}>
                  {isLoading ? (
                    <ClipLoader
                      loading={isLoadingCreateCompany}
                      size={20}
                      color="white"
                    />
                  ) : (
                    "Finish"
                  )}
                </BlueButton>
              </div>
              {<p className={styles.ErrorMessage}>{isErrorCreateCompany}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
