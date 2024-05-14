import React, { useContext } from 'react'

import styles from './Result.module.css'
import ToDoContext from '../Contexts/ToDoContext'

const Result = () => {
	const { toDos, deleteToDo, completeToDo, sortToDo } = useContext(ToDoContext)

	const yourTasks = toDos.map(toDo => {
		return (
			<div className={styles.box_result} key={toDo.id}>
				<div className={styles.div_box}>
					<h3 className={toDo.isComplete ? styles.heading_out : styles.heading_normal}>{toDo.task}</h3>
				</div>
				<div className={styles.div_box}>
					<button className={styles.btn_delete} onClick={() => deleteToDo(toDo.id)}>
						Delete
					</button>
				</div>
				<div className={styles.div_box}>
					<input
						className={styles.check_box}
						type='checkbox'
						// checked={toDo.isComplete}
						onClick={() => completeToDo(toDo.id)}
					/>
				</div>
			</div>
		)
	})

	return (
		<div className={styles.wrapper_result}>
			<div className={styles.box_btn}>
				<button className={styles.btn_action} onClick={() => sortToDo(toDos)}>
					Posortuj alfabetycznie
				</button>
				<button className={styles.btn_action}>usuń wszystkie zadania</button>
			</div>
			{yourTasks}
		</div>
	)
}

export default Result
