import React, { useState } from "react";
import styles from "./taskModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxList from "./CheckBoxList";
import { BlueButton } from "../buttons/blueButton/BlueButton";
import Description from "./Description";
import { BorderButton } from "../buttons/borderButton/BorderButton";
import DOMPurify from "dompurify";

const TaskModal = ({ isOpen, close }) => {
  const [isOpenChecklist, setIsOpenChecklist] = useState(false);
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [descriptionData, setDescriptionDate] = useState(null);

  if (isOpen) {
    document.body.style.overflow = "hidden";
  }

  return (
    <div
      className={`${isOpen ? styles.Background : styles.BackgroundClosed}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        close();
      }}>
      <div className={styles.Scrollbar}>
        <div
          className={styles.TaskModalParent}
          onClick={(e) => e.stopPropagation()}>
          <div className={styles.CoversParent}>
            <span className={styles.ExitIsList} onClick={close}>
              <CloseIcon htmlColor="black" />
            </span>
            <img
              src={require("../../assets/images/projectLogo.png")}
              alt=""
              className={styles.CoversImage}
            />
            <BlueButton
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
              }}>
              Covers
            </BlueButton>
          </div>

          <div className={styles.TaskModalWrapper}>
            <div className={styles.ComponentParent}>
              <input value={"Header"} className={styles.InputElement} />
              <h3 className={styles.DescriptionTitle}>Description</h3>

              {isOpenDescription ? (
                <div>
                  <Description
                    description={descriptionData}
                    setDescription={setDescriptionDate}
                  />
                  <div className={styles.DescriptionButtonsParent}>
                    <BlueButton
                      onClick={() => setIsOpenDescription(false)}
                      style={{ position: "static" }}>
                      Save
                    </BlueButton>
                    <BorderButton
                      onClick={() => {
                        setIsOpenDescription(false);
                        setDescriptionDate(null);
                      }}>
                      Cancel
                    </BorderButton>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsOpenDescription(true)}
                  className={styles.AddDescription}>
                  {descriptionData ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(descriptionData, {
                          ALLOWED_TAGS: [
                            "p",
                            "span",
                            "strong",
                            "em",
                            "b",
                            "u",
                            "i",
                            "ol",
                            "ul",
                            "li",
                            "br",
                            "h1",
                            "h2",
                            "h3",
                          ],
                          ALLOWED_ATTR: ["style"],
                          FORBID_TAGS: ["style"],
                          FORBID_ATTR: ["style"],
                        }),
                      }}
                    />
                  ) : (
                    "Add Description"
                  )}
                </button>
              )}
              {isOpenChecklist && (
                <input
                  className={styles.CheckListTitle}
                  defaultValue={"Check List"}
                />
              )}
              {isOpenChecklist && <CheckBoxList />}
            </div>
            <div className={styles.RightBar}>
              <label
                htmlFor="checklist"
                className={styles.CheckBoxListOpen}
                onChange={(e) => {
                  e.stopPropagation();
                  // e.preventDefault();
                  setIsOpenChecklist(!isOpenChecklist);
                }}>
                <input
                  type="checkbox"
                  checked={isOpenChecklist}
                  className={styles.CheckBox}
                  id="checklist"
                  onChange={(e) => {
                    e.stopPropagation();
                    // e.preventDefault();
                    setIsOpenChecklist(!isOpenChecklist);
                  }}
                />
                Check list
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskModal;
