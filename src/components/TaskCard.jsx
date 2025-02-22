const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold">{task.title}</h3>
      {task.description && <p className="text-gray-600">{task.description}</p>}
    </div>
  );
};

export default TaskCard;
