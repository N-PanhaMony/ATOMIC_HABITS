import { useState, useEffect } from 'react'
import { atomicHabitsProgram as task_plan } from '../utils/index.js'
import TaskCard from './TaskCard.jsx'

export default function Grid() {
  // Store all saved progress (completed days, notes…)
  const [savedTasks, setSavedTasks] = useState({})

  // Which day is currently opened (null = closed)
  const [selectedTask, setSelectedTask] = useState(null)

  // Get list of completed task indexes
  const completedTasks = Object.keys(savedTasks).filter(
    (key) => savedTasks[key]?.isComplete
  )

  // Save task progress + sync to localStorage
  const handleSave = (index, data) => {
    const newTasks = {
      ...savedTasks,
      [index]: {
        ...data,
        // Keep completed state if already completed earlier
        isComplete: !!data.isComplete || !!savedTasks[index]?.isComplete,
      },
    }

    setSavedTasks(newTasks)
    localStorage.setItem('habitChallenge', JSON.stringify(newTasks))

    // Close card after saving
    setSelectedTask(null)
  }

  // Quick shortcut to mark a task complete
  const handleComplete = (index) => {
    handleSave(index, { isComplete: true })
  }

  // Load saved progress from localStorage when component first loads
  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem('habitChallenge')
    if (saved) {
      try {
        // Prevent React warning about setState inside effect
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

      {/* Loop through all days */}
      {Object.keys(task_plan).map((task, taskIndex) => {

        // Lock this day unless previous day is completed
        const isLocked =
          taskIndex !== 0 && !completedTasks.includes(`${taskIndex - 1}`)

        // Get saved progress of this specific day
        const taskData = savedTasks[taskIndex] || {}

        const dayNum = taskIndex + 1 < 10 ? `0${taskIndex + 1}` : taskIndex + 1

        const icon = taskData.isComplete ? (
                <i className="fa-solid fa-check"></i>
              ) : (
                <i className="fa-regular fa-circle"></i>
              )

        // If this day was clicked, show the full TaskCard
        if (taskIndex === selectedTask) {
          return (
            <TaskCard
              key={taskIndex}
              taskIndex={taskIndex}
              dayNum={dayNum}
              icon={isLocked ? <i className="fa-solid fa-lock"></i> : <i className="fa-regular fa-circle"></i>}
              taskData={taskData}                 // saved data
              taskPlan={task_plan[task]}
              quote={task_plan[task]?.quote}          // default data from index.js
              handleSave={handleSave}
              handleComplete={handleComplete}
            />
          )
        }


        // Default: show day card
        return (
          <button
            key={taskIndex}
            onClick={() => {
              if (!isLocked) setSelectedTask(taskIndex)
            }}
            className={`plan-card ${isLocked ? 'inactive' : ''}`}
          >
            <div className="plan-card-number">
              {/* Format day number: 01, 02, 03… */}
              <p>Day {dayNum}</p>
            </div>

            {/* Icon: lock → check → empty circle */}
            <div className="task-card-icon">
              {isLocked ? (
                <i className="fa-solid fa-lock"></i>
              ) : (icon)}
            </div>
          </button>
        )
      })}
    </div>
  )
}
