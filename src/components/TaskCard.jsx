export default function TaskCard(props){

    const {task_plan, taskIndex , dayNum ,icon} = props
    return(
        <div className="task-container">
            <div className="task-card card"> 
                <div className="plan-card-header">
                    <p>Day {dayNum}</p>
                    {icon} 
                </div>
            </div>

        <div className="task-grid">
            <div className="task-name">

            </div>
            {/* get data from index.js and add input */}

        </div>

        <div className="task-button">
            <button>Save & Edit</button>
            <button disabled={true}>Complite</button>
        </div>
        
        </div>
    )
}