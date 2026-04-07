function TaskItem(props){

  const {
        task,
        toggleTask,
        deleteTask,
        isEditing,
        editingText,
        setEditingText,
        startEdit,
        saveEdit,
        cancelEdit
        } = props;
  
  return(
    <li>
    <input
      type="checkbox"
      checked={task.done}
      onChange={() => toggleTask(task.id)}
    />

    {isEditing ? (
      <input
        value={editingText}
        autoFocus
        onChange={(e) => setEditingText(e.target.value)}
        onBlur={() => saveEdit()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {saveEdit()}
          if (e.key === 'Escape') {cancelEdit()}
        }}
      />
      ) : (<span onClick={startEdit}>{task.text}</span>)
      }
      <button onClick={() => deleteTask(task.id)}>Удалить</button>
    </li>
  )
}

export default TaskItem