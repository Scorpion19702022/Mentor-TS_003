import React, { useContext } from 'react'

import styles from './Result.module.css'
import ToDoContext from '../Contexts/ToDoContext'

const Result = () => {
	const { toDos, deleteToDo, completeToDo } = useContext(ToDoContext)

	const yourTasks = toDos.map(toDo => {
		return (
			<div className={styles.box_result} key={toDo.id}>
				<h3 className={toDo.isComplete ? styles.heading_out : styles.heading_normal}>{toDo.task}</h3>
				<button onClick={() => deleteToDo(toDo.id)}>Delete</button>
				<input type='checkbox' checked={toDo.isComplete} onClick={() => completeToDo(toDo.id)} />
			</div>
		)
	})

	return <div className={styles.wrapper_result}>{yourTasks}</div>
}

export default Result
