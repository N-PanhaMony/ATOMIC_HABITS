import { useState, useEffect } from 'react'
import { atomicHabitsProgram as task_plan } from '../utils/index.js'
import TaskCard from './TaskCard.jsx'

export default function Grid() {
  const [savedTasks, setSavedTasks] = useState({})
  const [selectedTask, setSelectedTask] = useState(null)

  const completedTasks = Object.keys(savedTasks).filter((key) => savedTasks[key]?.isComplete)

  const handleSave = (index, data) => {
    const newTasks = {
      ...savedTasks,
      [index]: {
        ...data,
        isComplete: !!data.isComplete || !!savedTasks[index]?.isComplete,
      },
    }
    setSavedTasks(newTasks)
    localStorage.setItem('habitChallenge', JSON.stringify(newTasks))
    setSelectedTask(null)
  }

  const handleComplete = (index) => {
    handleSave(index, { isComplete: true })
  }

  useEffect(() => {
  if (typeof window === 'undefined') return

  const saved = localStorage.getItem('habitChallenge')
  if (saved) {
    try {
      // Wrap setState in setTimeout to avoid synchronous render warning
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
      {Object.keys(task_plan).map((task, taskIndex) => {
        const isLocked = taskIndex !== 0 && !completedTasks.includes(`${taskIndex - 1}`)
        const taskData = savedTasks[taskIndex] || {}

        if (taskIndex === selectedTask) {
          return (
            <TaskCard
              key={taskIndex}
              taskIndex={taskIndex}
              taskData={taskData}
              handleSave={handleSave}
              handleComplete={handleComplete}
            />
          )
        }

        return (
          <button
            key={taskIndex}
            onClick={() => {
              if (!isLocked) setSelectedTask(taskIndex)
            }}
            className={`plan-card ${isLocked ? 'inactive' : ''}`}
          >
            <div className="plan-card-number">
              <p>Day {taskIndex + 1 < 10 ? `0${taskIndex + 1}` : taskIndex + 1}</p>
            </div>
            <div className="task-card-icon">
              {isLocked ? (
                <i className="fa-solid fa-lock"></i>
              ) : taskData.isComplete ? (
                <i className="fa-solid fa-check"></i>
              ) : (
                <i className="fa-regular fa-circle"></i>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
