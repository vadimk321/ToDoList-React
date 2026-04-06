function TaskItem(props){

  const {
        task,
        toggleTask,
        saveEditTask,
        editTask,
        deleteTask,
        editingId,
        editingText,
        setEditingText,
        cancelSaveTask
        } = props;
  
  return(
    <li key={task.id}>
    <input
      type="checkbox"
      checked={task.done}
      onChange={() => toggleTask(task.id)}
    />

    {editingId === task.id ? (
      <input
        value={editingText}
        autoFocus
        onChange={(e) => setEditingText(e.target.value)}
        onBlur={() => saveEditTask(task.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {saveEditTask(task.id)}
          if (e.key === 'Escape') {cancelSaveTask()}
        }}
      />
      ) : (<span onClick={() => editTask(task.id)}>{task.text}</span>)
      }
      <button onClick={() => deleteTask(task.id)}>Удалить</button>
    </li>
  )
}

export default TaskItem