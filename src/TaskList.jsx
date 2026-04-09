import TaskItem from './TaskItem.jsx'


function TaskList(props){
  
  const {tasks,
        toggleTask,
        deleteTask,
        startEdit,
        saveEdit,
        cancelEdit,
        editingId
        } = props;
  

  return (
    <ul>
        {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            isEditing={editingId === task.id}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            />
          )
        )}
      </ul>
  );
}


export default TaskList