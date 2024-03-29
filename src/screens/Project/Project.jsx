import styles from "./project.module.css";
import React, { useEffect, useState } from "react";
import { RenderedItems } from "../../Components/RenderedItems/RenderedItems";
import { ReactComponent as FlagMark } from "../../Assets/icons/flagMark.svg";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { updateTaskSortRequest } from "../../store/authUsersReducer/updateTaskSortSlice.tsx";
import { pusher } from "../../pusher";
import { useNavigate, useParams } from "react-router-dom";
import TaskModal from "../../Components/TaskModal/TaskModal";
import { changeTitle } from "../../store/otherSlice/pageTitleSlice.tsx";
import { BlueButton } from "../../Components/buttons/blueButton/BlueButton.jsx";
import { addBoardRequest } from "../../store/authUsersReducer/addBoardSlice.tsx";
import { getTaskRequest } from "../../store/authUsersReducer/getTaskSlice.tsx";
import { Tooltip } from "@mui/material";
import {
  AddTask as AddTaskIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";
import { removeBoardRequest } from "../../store/authUsersReducer/removeBoardSlice.tsx";
import { singleProjectRequest } from "../../store/authUsersReducer/singleProjectSlice.tsx";

const role = localStorage.getItem("role");

const Project = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { project_id } = useParams();

  const [boards, setBoards] = useState([]);

  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  useEffect(() => {
    const channel = pusher.subscribe("project-list");

    const handleTaskSortUpdated = () => {
      dispatch(singleProjectRequest(project_id)).then((res) => {
        setBoards(res.payload?.payload?.statuses);
      });
    };

    channel.bind("task.sort-updated", handleTaskSortUpdated);
    channel.bind("task.created", handleTaskSortUpdated);
    channel.bind("task.deleted", handleTaskSortUpdated);
    channel.bind("status.deleted", handleTaskSortUpdated);
    channel.bind("status.created", handleTaskSortUpdated);
    channel.bind("task.assigned", handleTaskSortUpdated);

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [dispatch, project_id]);

  useEffect(() => {
    dispatch(singleProjectRequest(project_id)).then((res) => {
      setBoards(res.payload?.payload?.statuses);

      dispatch(changeTitle({ title: res.payload?.payload?.name }));
    });
  }, [dispatch, project_id]);

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;
    if (!destination) return;

    const sourceColumn = boards.find(
      (column) => column.id === source.droppableId
    );
    const destinationColumn = boards.find(
      (column) => column.id === destination.droppableId
    );

    if (sourceColumn.id === destinationColumn.id) {
      const newTasks = [...sourceColumn.tasks];
      const [draggedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggedTask);

      const newColumns = boards.map((column) =>
        column.id === sourceColumn.id ? { ...column, tasks: newTasks } : column
      );

      const newTasksData = newColumns.map((board) => ({
        column_id: board.id,
        task_id: board.tasks.map((task) => task?.id),
        sort: board.tasks.map((_, index) => index),
      }));

      setBoards(newColumns);
      dispatch(
        updateTaskSortRequest({
          board_data: JSON.stringify(newTasksData),
          project_id,
        })
      );
    } else {
      const draggedTask = sourceColumn.tasks.find(
        (task) => task.id === draggableId
      );

      const newDestinationTasks = [...destinationColumn.tasks];
      newDestinationTasks.splice(destination.index, 0, draggedTask);
      const newSourceTasks = [...sourceColumn.tasks];
      newSourceTasks.splice(source.index, 1);

      const newColumns = boards.map((column) =>
        column.id === sourceColumn.id
          ? { ...column, tasks: newSourceTasks }
          : column.id === destinationColumn.id
            ? { ...column, tasks: newDestinationTasks }
            : column
      );

      const newTasksData = newColumns.map((board) => ({
        column_id: board.id,
        task_id: board.tasks.map((task) => task?.id),
        sort: board.tasks.map((_, index) => index),
      }));

      setBoards(newColumns);
      dispatch(
        updateTaskSortRequest({
          board_data: JSON.stringify(newTasksData),
          project_id,
        })
      );
    }
  };

  const getListStyle = (isDraggingOver) => ({
    boxShadow: isDraggingOver && "0 0 5px #6259ca",
    minHeight: 40,
    paddingBottom: 10,
  });

  const openTaskModalFunc = (item) => {
    dispatch(getTaskRequest(item.id));
    setOpenTaskModal(true);
  };

  const closeTaskModalFunc = () => {
    setOpenTaskModal(false);
  };

  const addEmptyBoard = () => {
    setBoards((prevState) => [
      ...prevState,
      {
        id: Date.now().toString(),
        name: newBoardName,
        tasks: [],
      },
    ]);
    setNewBoardName("");
  };

  const saveNewBoard = () => {
    dispatch(addBoardRequest({ project_id, newBoardName })).then((result) => {
      if (result.payload.success) {
        dispatch(singleProjectRequest(project_id)).then((res) => {
          setBoards(res.payload?.payload?.statuses);
        });
      }
    });
  };

  const checkStatusBoardOnBlur = (boardId, boardName) => {
    if (!boardName?.trim()) {
      // Remove the board if the input is empty
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== boardId)
      );
    }
  };

  const removeBoard = (boardId) => {
    dispatch(removeBoardRequest(boardId)).then((response) => {});
    setBoards((prevBoards) =>
      prevBoards.filter((board) => board.id !== boardId)
    );
  };

  const renderBoard = (board, i) => {
    return (
      <RenderedItems key={i}>
        <div className={styles.BoardTitleParent}>
          {board.name ? (
            <>
              <h2 className={styles.Title}>
                {board.name}{" "}
                <span className={styles.SubTitle}>({board.tasks?.length})</span>
              </h2>
              {role === "2" && (
                <div className={styles.RightSideIcons}>
                  <Tooltip title="Delete Board" arrow>
                    <DeleteOutlineIcon
                      style={{
                        cursor: "pointer",
                        color: "red",
                        fontSize: 20,
                      }}
                      onClick={() => removeBoard(board.id)}
                    />
                  </Tooltip>
                  <Tooltip title="Add new task" arrow>
                    <AddTaskIcon
                      style={{
                        color: "black",
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(`/add-task/${project_id}`);
                        localStorage.setItem("status_id", board.id);
                      }}
                    />
                  </Tooltip>
                </div>
              )}
            </>
          ) : (
            <div className={styles.InputParent}>
              <input
                type="text"
                autoFocus
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                className={styles.BoardInput}
                onBlur={() => checkStatusBoardOnBlur(board.id, newBoardName)}
              />
              <BlueButton
                style={{ position: "static", marginTop: 10 }}
                onClick={saveNewBoard}>
                Save
              </BlueButton>
            </div>
          )}
        </div>
        <div className={styles.Line}></div>

        <Droppable droppableId={board.id} type="group" key={board.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
              className={styles.DroppableDiv}>
              {board.tasks.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={styles.Tasks}
                      onClick={() => openTaskModalFunc(item)}>
                      <div className={styles.TaskName}>
                        <p>{item.name}</p>
                        <FlagMark />
                      </div>
                      <h3 className={styles.Completes}>Complete </h3>
                      <div className={styles.CreatedUsersParent}>
                        {item.users.map((user, $$) => (
                          <div className={styles.CreatedUsers} key={$$}>
                            <p className={styles.UserNameFirstLatterOrImage}>
                              {user.avatar ? (
                                <img
                                  src={user.avatar}
                                  alt={user.avatar}
                                  className={styles.Avatar}
                                />
                              ) : (
                                <>
                                  {user?.name[0]} {user?.name?.split(" ")[1][0]}
                                </>
                              )}
                            </p>
                            <div>
                              <p className={styles.UserNameAndDeveloperType}>
                                {user.name}
                              </p>
                              <p className={styles.UserNameAndDeveloperType}>
                                Front-end (50/15)
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className={styles.WorkTime}>
                        <p className={styles.StartAndDeadline}>
                          Start 13.06.2023
                        </p>
                        <p className={styles.StartAndDeadline}>
                          Deadline 13.06.2023
                        </p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </RenderedItems>
    );
  };

  return (
    <div className={styles.Project}>
      <DragDropContext onDragEnd={onDragEnd}>
        {boards?.map(renderBoard)}
      </DragDropContext>
      <TaskModal isOpen={openTaskModal} close={closeTaskModalFunc} />
      <BlueButton disabled={null} onClick={addEmptyBoard} role={role === "2"}>
        + Add board
      </BlueButton>
    </div>
  );
};

export default Project;
