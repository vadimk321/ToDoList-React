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
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            isEditing={editingId === task.id}
            editingText={editingText}
            setEditingText={setEditingText}
            startEdit={() => {startEdit(task.id)}}
            saveEdit={() => {saveEdit(task.id)}}
            cancelEdit={cancelEdit}
            />
          )
        )}
      </ul>
  );
}


export default TaskList