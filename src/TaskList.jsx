import TaskItem from './TaskItem.jsx'


function TaskList(props){

 const {tasks,
        toggleTask,
        deleteTask,
        editingText,
        setEditingText,
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
            editingText={editingText}
            setEditingText={setEditingText}
            toggleTask={() => toggleTask(task.id)}
            deleteTask={() => deleteTask(task.id)}
            startEdit={() => startEdit(task.id)}
            saveEdit={() => saveEdit(task.id)}
            cancelEdit={cancelEdit}
            />
          )
        )}
      </ul>
  );
}


export default TaskList