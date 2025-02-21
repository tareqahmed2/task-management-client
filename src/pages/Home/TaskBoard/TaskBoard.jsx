import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../../../components/TaskCard";
import TaskForm from "../../../components/TaskForm";

// Fake data for demonstration
const fakeTasks = [
  {
    _id: "1",
    title: "Task 1",
    description: "Description 1",
    category: "To-Do",
  },
  {
    _id: "2",
    title: "Task 2",
    description: "Description 2",
    category: "In Progress",
  },
  { _id: "3", title: "Task 3", description: "Description 3", category: "Done" },
  {
    _id: "4",
    title: "Task 4",
    description: "Description 4",
    category: "To-Do",
  },
];

const TaskBoard = () => {
  const [columns, setColumns] = useState({
    "To-Do": [],
    "In Progress": [],
    Done: [],
  });

  // Populate fake data into columns on component mount.
  useEffect(() => {
    const cols = { "To-Do": [], "In Progress": [], Done: [] };
    fakeTasks.forEach((task) => {
      cols[task.category].push(task);
    });
    setColumns(cols);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;
    const sourceTasks = Array.from(columns[sourceCol]);
    // Remove the task from source
    const [removed] = sourceTasks.splice(source.index, 1);

    if (sourceCol === destCol) {
      // Reordering within the same column
      sourceTasks.splice(destination.index, 0, removed);
      setColumns({ ...columns, [sourceCol]: sourceTasks });
    } else {
      // Moving to a different column
      const destTasks = Array.from(columns[destCol]);
      removed.category = destCol;
      destTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks,
      });
    }
  };

  // Adding a new task always adds to the "To-Do" column
  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      _id: Date.now().toString(),
      category: "To-Do",
    };
    setColumns({
      ...columns,
      "To-Do": [taskWithId, ...columns["To-Do"]],
    });
  };

  return (
    <div className="my-10">
      <TaskForm addTask={addTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
          {Object.keys(columns).map((colId) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 rounded flex-1 min-h-[300px]"
                >
                  <h2 className="text-xl font-bold mb-2">{colId}</h2>
                  {columns[colId].map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2"
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
