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

  // Initialize tasks in priority order:
  // 1. Previously saved tasks
  // 2. Default plan tasks
  // 3. Safe fallback (prevents empty UI)
  const [tasks, setTasks] = useState(
    taskData.tasks?.length
      ? taskData.tasks
      : taskPlan.tasks || [{ activity: "", detail: "", time: "" }]
  );

  // Notes follow same precedence as tasks
  const [notes, setNotes] = useState(
    taskData.notes || taskPlan.notes || ""
  );

  // Append a new empty task row
  const addTask = () =>
    setTasks([...tasks, { activity: "", detail: "", time: "" }]);

  // Remove task by index (immutable update)
  const removeTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  // Update a single field of a task
  // Keeps TaskCard fully controlled
  const updateTask = (index, field, value) => {
    const updated = [...tasks];
    updated[index][field] = value;
    setTasks(updated);
  };

  // Save progress without completing the day
  const saveData = () => {
    props.handleSave(taskIndex, {
      tasks,
      notes,
      isComplete: false,
    });
  };

  // Mark day complete AND persist all data
  const completeDay = () => {
    props.handleSave(taskIndex, {
      tasks,
      notes,
      isComplete: true,
    });
  };

  return (
    <div className="task-container">
      <div className="task-card card">
        <div className="plan-card-header">
          <p>Day {dayNum}</p>
          {icon}
        </div>

        {/* Motivational quote from plan */}
        <p className="quote">{quote}</p>
      </div>

      {/* Editable task list */}
      <div className="task-grid">
        {tasks.map((task, index) => (
          <div key={index}>
            <div className="task-content">

              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={task.activity}
                  onChange={(e) =>
                    updateTask(index, "activity", e.target.value)
                  }
                />
              </div>

              <div>
                <label>Detail</label>
                <input
                  type="text"
                  value={task.detail}
                  onChange={(e) =>
                    updateTask(index, "detail", e.target.value)
                  }
                />
              </div>

              <div>
                <label>Time</label>
                <input
                  type="text"
                  value={task.time}
                  onChange={(e) =>
                    updateTask(index, "time", e.target.value)
                  }
                />
              </div>

              <button onClick={() => removeTask(index)}>
                Remove Task
              </button>
            </div>
          </div>
        ))}

        <button onClick={addTask}>Add New Task</button>

        {/* Free-form user notes */}
        <div>
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="task-button">
        <button onClick={saveData}>Save & Edit</button>
        <button onClick={completeDay}>Complete</button>
      </div>
    </div>
  );
}
