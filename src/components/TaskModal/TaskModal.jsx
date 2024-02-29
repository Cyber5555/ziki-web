import React, { useEffect, useState } from "react";
import styles from "./taskModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxList from "./CheckBoxList";
import Description from "./Description";
import DOMPurify from "dompurify";
import Galleries from "./Galleries";
import { useSelector } from "react-redux";
import { BorderButton } from "../buttons/borderButton/BorderButton";
import { BlueButton } from "../buttons/blueButton/BlueButton";
import { Tooltip } from "@mui/material";
import { updateTaskRequest } from "../../store/authUsersReducer/updateTaskSlice.tsx";
import { useDispatch } from "react-redux";

const TaskModal = ({ isOpen, close }) => {
  const dispatch = useDispatch();
  const { task_data } = useSelector((state) => state.getTaskSlice);
  const [descriptionData, setDescriptionDate] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [gallery, setGallery] = useState("Galleries");
  const [isOpenSection, setIsOpenSection] = useState({
    checklist: false,
    galleries: false,
    description: false,
  });

  if (isOpen) {
    document.body.style.overflow = "hidden";
  }

  const handleSectionToggle = (section) => {
    setIsOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    setDescriptionDate(task_data?.description);
    setTaskName(task_data?.name);
    setIsOpenSection({
      galleries: task_data?.galleries?.length > 0 ? true : false,
    });
  }, [task_data?.description, task_data?.galleries, task_data?.name]);

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
          <span className={styles.ExitIsList} onClick={close}>
            <CloseIcon htmlColor="black" />
          </span>

          <div className={styles.TaskModalWrapper}>
            <div className={styles.ComponentParent}>
              <Tooltip title={"For change project title click here"} arrow>
                <input
                  value={taskName}
                  className={styles.InputElement}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </Tooltip>
              <h3 className={styles.DescriptionTitle}>Description</h3>

              {isOpenSection.description ? (
                <div>
                  <Description
                    description={descriptionData}
                    setDescription={setDescriptionDate}
                  />
                  <div className={styles.DescriptionButtonsParent}>
                    <BlueButton
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          updateTaskRequest({
                            status_id: task_data.status_id,
                            description: descriptionData,
                          })
                        );
                        // handleSectionToggle("description");
                      }}
                      style={{ position: "static" }}>
                      Save
                    </BlueButton>
                    <BorderButton
                      onClick={() => {
                        handleSectionToggle("description");
                        setDescriptionDate(task_data?.description);
                      }}>
                      Cancel
                    </BorderButton>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleSectionToggle("description")}
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
              {isOpenSection.checklist && (
                <input
                  className={styles.CheckListTitle}
                  value={"Check List"}
                  onChange={null}
                />
              )}
              {isOpenSection.checklist && <CheckBoxList />}

              {isOpenSection.galleries && (
                <Tooltip title={`For change ${gallery} title click here`} arrow>
                  <input
                    className={styles.CheckListTitle}
                    value={gallery}
                    onChange={(e) => setGallery(e.target.value)}
                  />
                </Tooltip>
              )}
              {isOpenSection.galleries && (
                <Galleries galleries={task_data?.galleries} />
              )}
            </div>
            <div className={styles.RightBar}>
              <label htmlFor="checklist" className={styles.CheckBoxListOpen}>
                <input
                  type="checkbox"
                  checked={isOpenSection.checklist}
                  className={styles.CheckBox}
                  id="checklist"
                  onChange={() => handleSectionToggle("checklist")}
                />
                Check list
              </label>
              <label htmlFor="galleries" className={styles.CheckBoxListOpen}>
                <input
                  type="checkbox"
                  checked={isOpenSection.galleries}
                  className={styles.CheckBox}
                  id="galleries"
                  onChange={() => handleSectionToggle("galleries")}
                />
                Galleries
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskModal;
