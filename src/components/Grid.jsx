import { useState, useEffect } from 'react'
import { atomicHabitsProgram as task_plan } from '../utils/index.js'
import TaskCard from './TaskCard.jsx'

export default function Grid() {

  // Object keyed by day index → stores tasks, notes, completion state
  // Example: { 0: { tasks: [...], notes: "...", isComplete: true } }
  const [savedTasks, setSavedTasks] = useState({})

  // Tracks which day card is currently opened (null = grid view)
  const [selectedTask, setSelectedTask] = useState(null)

  // Derive completed day indexes from savedTasks
  // This avoids storing redundant state
  const completedTasks = Object.keys(savedTasks).filter(
    (key) => savedTasks[key]?.isComplete
  )

  // Centralized save handler
  // - merges new data
  // - preserves completion if already completed
  // - syncs to localStorage
  const handleSave = (index, data) => {
    const newTasks = {
      ...savedTasks,
      [index]: {
        ...data,
        // Prevent accidental "un-complete" when editing
        isComplete: !!data.isComplete || !!savedTasks[index]?.isComplete,
      },
    }

    setSavedTasks(newTasks)

    // Persist progress across reloads
    localStorage.setItem('habitChallenge', JSON.stringify(newTasks))

    // UX: close the editor after saving
    setSelectedTask(null)
  }

  // Helper shortcut for "complete" action
  // Keeps Grid as the single source of truth
  const handleComplete = (index) => {
    handleSave(index, { isComplete: true })
  }

  // Load persisted data only once on mount
  useEffect(() => {
    // Guard for non-browser environments (SSR safety)
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem('habitChallenge')
    if (saved) {
      try {
        // setTimeout avoids React warning in some edge cases
        // (not strictly required, but defensive)
        setTimeout(() => {
          setSavedTasks(JSON.parse(saved))
        }, 0)
      } catch (e) {
        console.error('Failed to parse saved tasks', e)
      }
    }
  }, [])

  return (
    <div className="task-grid-plan">

      {/* Render each day from the plan definition */}
      {Object.keys(task_plan).map((task, taskIndex) => {

        // Lock rule:
        // - Day 0 is always unlocked
        // - Other days unlock only if previous day is complete
        const isLocked =
          taskIndex !== 0 && !completedTasks.includes(`${taskIndex - 1}`)

        // Load saved data for this day (if any)
        const taskData = savedTasks[taskIndex] || {}

        // Format day number as 01, 02, 03...
        const dayNum =
          taskIndex + 1 < 10 ? `0${taskIndex + 1}` : taskIndex + 1

        // Completion icon state
        const icon = taskData.isComplete ? (
          <i className="fa-solid fa-check"></i>
        ) : (
          <i className="fa-regular fa-circle"></i>
        )

        // If this day is selected → render editor instead of card
        if (taskIndex === selectedTask) {
          return (
            <div className="task-container" key={taskIndex}>
              <TaskCard
                taskIndex={taskIndex}
                dayNum={dayNum}
                // Lock icon overrides completion icon
                icon={
                  isLocked
                    ? <i className="fa-solid fa-lock"></i>
                    : <i className="fa-regular fa-circle"></i>
                }
                taskData={taskData}             // persisted user data
                taskPlan={task_plan[task]}      // default plan template
                quote={task_plan[task]?.quote}  // motivational text
                handleSave={handleSave}
                handleComplete={handleComplete}
              />
            </div>
          )
        }

        // Default grid card view
        return (
          <button
            key={taskIndex}
            // Prevent opening locked days
            onClick={() => {
              if (!isLocked) setSelectedTask(taskIndex)
            }}
            className={`plan-card ${isLocked ? 'inactive' : ''}`}
          >
            <div className="plan-card-header">
              <p>Day {dayNum}</p>
            </div>

            {/* Priority: lock → completed → incomplete */}
            <div className="task-card-icon">
              {isLocked ? (
                <i className="fa-solid fa-lock"></i>
              ) : (
                icon
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
