import React, { useEffect, useState } from "react";
import { RenderedItems } from "../../components/RenderedItems/RenderedItems";
import styles from "./project.module.css";
import { getProjectColumnRequest } from "../../store/authUsersReducer/getProjectColumnSlice";
import FlagMark from "../../assets/icons/flagMark.svg";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateTaskSortRequest } from "../../store/authUsersReducer/updateTaskSortSlice";
import Pusher from "pusher-js";

const Project = () => {
  const dispatch = useDispatch();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    let pusher = new Pusher("ee8b67274fccf540b81e", {
      appId: "1651282",
      secret: "0cbc75cacff02b16b2c9",
      cluster: "ap2",
      // encrypted: true,
    });

    const channel = pusher.subscribe("project-list");

    channel.bind("task.sort-updated", function (data) {
      dispatch(
        getProjectColumnRequest({ id: localStorage.getItem("idea") })
      ).then((res) => {
        setBoards(res.payload?.payload?.statuses);
        pusher.disconnect();
      });
      return data;
    });
  }, [boards, dispatch]);

  useEffect(() => {
    dispatch(
      getProjectColumnRequest({ id: localStorage.getItem("idea") })
    ).then((res) => {
      setBoards(res.payload?.payload?.statuses);
    });
  }, [dispatch]);

  function onDragEnd(result) {
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

      const newColumns = boards.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            tasks: newTasks,
          };
        }
        return column;
      });
      const new_tasks_id = newColumns.map((board) => ({
        column_id: board.id,
        task_id: board.tasks.map((task) => task.id),
        sort: board.tasks.map((_, index) => index),
      }));

      setBoards(newColumns);
      dispatch(
        updateTaskSortRequest({
          board_data: JSON.stringify(new_tasks_id),
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

      const newColumns = boards.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            tasks: newSourceTasks,
          };
        }
        if (column.id === destinationColumn.id) {
          return {
            ...column,
            tasks: newDestinationTasks,
          };
        }
        return column;
      });

      const new_tasks_id = newColumns.map((board) => ({
        column_id: board.id,
        task_id: board.tasks.map((task) => task.id),
        sort: board.tasks.map((_, index) => index),
      }));

      setBoards(newColumns);
      dispatch(
        updateTaskSortRequest({
          board_data: JSON.stringify(new_tasks_id),
        })
      );
    }
  }

  const getListStyle = (isDraggingOver) => ({
    boxShadow: isDraggingOver && "0 0 5px #6259ca",
    minHeight: 40,
    paddingBottom: 10,
  });

  return (
    <div className={styles.Project}>
      <DragDropContext onDragEnd={onDragEnd}>
        {boards.map((board, i) => (
          <RenderedItems key={i}>
            <h2 className={styles.Title}>
              {board.name} {board.id}
              <span className={styles.SubTitle}>({board.tasks?.length})</span>
            </h2>
            <div className={styles.Line}></div>

            <Droppable droppableId={board.id} type="group" key={board.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {board.tasks.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={styles.Tasks}>
                          <div className={styles.TaskName}>
                            <p>{item.name}</p>
                            <img src={FlagMark} alt="FlagMark" />
                          </div>
                          <h3 className={styles.Complates}>Complate </h3>
                          <div className={styles.SprintsParent}>
                            {/*<Tasks id={item.id} title={item.description} />*/}
                          </div>
                          <div className={styles.CreatedUsersParent}>
                            {item.users.map((user, $$) => (
                              <div className={styles.CreatedUsers} key={$$}>
                                <div
                                  className={styles.UserNameFirstLatterOrImage}>
                                  {user.name[0]}
                                </div>
                                <div>
                                  <p
                                    className={styles.UserNameAndDeveloperType}>
                                    {user.name}
                                  </p>
                                  <p
                                    className={styles.UserNameAndDeveloperType}>
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
        ))}
      </DragDropContext>
    </div>
  );
};

export default Project;
