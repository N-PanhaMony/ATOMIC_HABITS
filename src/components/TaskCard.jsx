import { useState } from "react";

export default function TaskCard(props) {
  const {
    taskIndex,
    dayNum,
    icon,
    quote,
    taskPlan = {},
    taskData = {},
  } = props;

  // Initialize tasks safely
  const [tasks, setTasks] = useState(
    taskData.tasks?.length
      ? taskData.tasks
      : taskPlan.tasks || [{ quote: "", activity: "", detail: "", time: "" }]
  );

  const [notes, setNotes] = useState(taskData.notes || taskPlan.notes || "");

  // Add new task
  const addTask = () =>
    setTasks([...tasks, { activity: "", detail: "", time: "" }]);
  // delete 
  const removeTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  // Update task field
  const updateTask = (index, field, value) => {
    const updated = [...tasks];
    updated[index][field] = value;
    setTasks(updated);
  };

  return (
    <div className="task-container">
      <div className="task-card card">
        <div className="plan-card-header">
          <p>Day {dayNum}</p>
          {icon}
        </div>
           <p className="quote">{quote}</p>
      </div>

      <div className="task-grid">
        {tasks.map((task, index) => (
          <div key={index} >
            <div className="task-content">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={task.activity}
                  onChange={(e) => updateTask(index, "activity", e.target.value)}
                />
              </div>

              <div>
                <label>Detail</label>
                <input
                  type="text"
                  value={task.detail}
                  onChange={(e) => updateTask(index, "detail", e.target.value)}
                />
              </div>

              <div>
                <label>Time</label>
                <input
                  type="text"
                  value={task.time}
                  onChange={(e) => updateTask(index, "time", e.target.value)}
                />
              </div>
              <button onClick={() => removeTask(index)}>Remove Task</button>
            </div>

          </div>
        ))}
        <button onClick={addTask}>Add New Task</button>

        {/* NOTES */}
        <div>
          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>


      <div className="task-button">
        <button>Save & Edit</button>
        <button disabled={true}>Complete</button>
      </div>
    </div>
  );
}
