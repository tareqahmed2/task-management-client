import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setTaskData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    // Create the timestamp in the desired format
    const timestamp = new Date().toISOString();

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
        category: "To-Do",
        timestamp: timestamp, // Send the created timestamp
      });
      if (response.data.insertedId) {
        setTaskData(true);
      }

      // After adding the task, refetch the tasks

      // Reset the form
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          maxLength={50}
          required
        />
        <textarea
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          maxLength={200}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
