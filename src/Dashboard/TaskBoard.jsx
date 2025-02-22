import axios from "axios";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskForm from "../components/TaskForm";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
const categories = ["To-Do", "In Progress", "Done"];
const ItemTypes = { TASK: "task" };

// PUT API call function to update task position and category
const updateTaskPosition = async (taskId, newCategory, newOrder) => {
  try {
    await axios.put(
      `https://task-management-server-taupe-nu.vercel.app/api/tasks/${taskId}`,
      {
        category: newCategory,
        order: newOrder,
      }
    );
    console.log(
      `Task ${taskId} updated: category ${newCategory}, order ${newOrder}`
    );
  } catch (error) {
    console.error("Error updating task position:", error);
  }
};

// const TaskCard = ({
//   task,
//   index,
//   moveTask,
//   reorderTasks,
//   onEdit,
//   onDelete,
// }) => {
//   const ref = useRef(null);
//   const { setTaskData } = useAuth();
//   const [isOpen, setOpen] = useState(false);
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemTypes.TASK,
//     item: { id: task._id, index, category: task.category },
//     collect: (monitor) => ({ isDragging: monitor.isDragging() }),
//   });
//   const handleEdit = (task) => {
//     setOpen(true);
//     const res = axios
//       .put(`https://task-management-server-taupe-nu.vercel.app/task/update/${task._id}`, {
//         title: task.title,
//         description: task.description,
//         category: task.category,
//         order: task.order,
//       })
//       .then((response) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         console.error("Error updating task:", error);
//       });
//   };

//   const handleDelete = async (id) => {
//     const res = await axios.delete(`https://task-management-server-taupe-nu.vercel.app/task/delete/${id}`);
//     console.log(res);
//     if (res.data.deletedCount > 0) {
//       setTaskData(true);
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Deleted",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };
//   // Drop target for reordering within the same column
//   const [, drop] = useDrop({
//     accept: ItemTypes.TASK,
//     hover(draggedItem) {
//       if (draggedItem.category !== task.category) return;
//       if (draggedItem.id === task._id) return;

//       reorderTasks(draggedItem.id, task._id, task.category);
//       draggedItem.index = index;
//     },
//   });

//   drag(drop(ref));

//   return (
//     <div
//       ref={ref}
//       className={`p-4 mb-1 rounded shadow text-white flex flex-col gap-2 ${
//         isDragging ? "bg-blue-900" : "bg-blue-600"
//       }`}
//       style={{ cursor: "move" }}
//     >
//       <h3 className="font-semibold">{task.title}</h3>
//       <p className="text-sm">{task.description}</p>
//       <small className="block">{task.timestamp}</small>

//       {/* Action Buttons */}
//       <div className="flex gap-2 mt-2">
//         <button
//           onClick={() => handleEdit(task)}
//           className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => handleDelete(task._id)}
//           className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };/ Adjust import as per your project structure

const TaskCard = ({
  task,
  index,
  moveTask,
  reorderTasks,
  onEdit,
  onDelete,
}) => {
  const ref = useRef(null);
  const { setTaskData } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    category: task.category,
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task._id, index, category: task.category },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const handleEdit = () => {
    setOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({
      ...updatedTask,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    const { title, description, category } = updatedTask;
    const res = await axios.put(
      `https://task-management-server-taupe-nu.vercel.app/task/update/${task._id}`,
      {
        title,
        description,
        category,
        order: task.order,
      }
    );
    if (res.status === 200) {
      setTaskData(true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task Updated",
        showConfirmButton: false,
        timer: 1500,
      });
      setOpen(false);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error updating task",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `https://task-management-server-taupe-nu.vercel.app/task/delete/${id}`
    );
    if (res.data.deletedCount > 0) {
      setTaskData(true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(draggedItem) {
      if (draggedItem.category !== task.category) return;
      if (draggedItem.id === task._id) return;

      reorderTasks(draggedItem.id, task._id, task.category);
      draggedItem.index = index;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`p-4 mb-1 rounded shadow text-white flex flex-col gap-2 ${
        isDragging ? "bg-blue-900" : "bg-blue-600"
      }`}
      style={{ cursor: "move" }}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm">{task.description}</p>
      <small className="block">{task.createdAt}</small>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>

      {/* Modal for updating task */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-600 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={updatedTask.title}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={updatedTask.description}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={updatedTask.category}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full text-black"
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const CategoryColumn = ({ category, tasks, moveTask, reorderTasks }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (draggedItem) => {
      if (draggedItem.category !== category) {
        moveTask(draggedItem.id, category);
        draggedItem.category = category;
      }
    },
  });

  return (
    <div
      ref={drop}
      className=" bg-gray-100 p-4 rounded-lg min-h-[400px] flex-1"
    >
      <h2 className="text-xl font-bold text-center mb-4">{category}</h2>
      {tasks.map((task, index) => (
        <TaskCard
          key={task._id}
          task={task}
          index={index}
          moveTask={moveTask}
          reorderTasks={reorderTasks}
        />
      ))}
    </div>
  );
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { taskData, setTaskData } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://task-management-server-taupe-nu.vercel.app/tasks"
        );
        console.log("Fetched tasks:", response.data);
        setTasks(response.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
    setTaskData(false);
  }, [taskData]);

  // Group tasks by category.
  const tasksByCategory = categories.reduce((acc, cat) => {
    acc[cat] = tasks.filter((task) => task.category === cat);
    return acc;
  }, {});

  // Move a task to a new column.
  const moveTask = useCallback(
    (id, newCategory) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task._id === id) {
            const newOrder =
              tasksByCategory[newCategory] &&
              tasksByCategory[newCategory].length > 0
                ? tasksByCategory[newCategory].length
                : 0;
            // Update backend
            updateTaskPosition(id, newCategory, newOrder);
            return { ...task, category: newCategory, order: newOrder };
          }
          return task;
        })
      );
    },
    [tasksByCategory]
  );

  // Reorder tasks within the same column.
  const reorderTasks = useCallback((draggedId, hoverId, category) => {
    setTasks((prevTasks) => {
      const categoryTasks = prevTasks.filter(
        (task) => task.category === category
      );
      const otherTasks = prevTasks.filter((task) => task.category !== category);
      const draggedTask = categoryTasks.find((task) => task._id === draggedId);

      const filtered = categoryTasks.filter((task) => task._id !== draggedId);
      const hoverIndex = filtered.findIndex((task) => task._id === hoverId);
      if (hoverIndex === -1) {
        filtered.push(draggedTask);
      } else {
        filtered.splice(hoverIndex, 0, draggedTask);
      }

      // Update order for tasks in the category
      const updatedCategoryTasks = filtered.map((task, index) => ({
        ...task,
        order: index,
      }));

      // Update backend for each task
      updatedCategoryTasks.forEach((task) => {
        updateTaskPosition(task._id, task.category, task.order);
      });

      return [...otherTasks, ...updatedCategoryTasks];
    });
  }, []);

  if (isLoading)
    return (
      <p className="min-h-screen max-w-screen-xl flex items-center justify-center">
        Loading...
      </p>
    );
  if (error) return <p>Error fetching tasks!</p>;

  return (
    <div>
      <TaskForm />
      <DndProvider backend={HTML5Backend}>
        <div className="max-w-7xl mx-auto min-h-screen my-10 flex flex-col md:flex-row justify-around p-4 gap-4">
          {categories.map((cat) => (
            <CategoryColumn
              key={cat}
              category={cat}
              tasks={tasksByCategory[cat]}
              moveTask={moveTask}
              reorderTasks={reorderTasks}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default TaskBoard;
