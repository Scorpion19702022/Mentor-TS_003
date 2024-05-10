import React, { useContext, useState } from 'react'

import styles from './Inputs.module.css'
import ToDoContext from '../Contexts/ToDoContext'

const Inputs = () => {
	const [inputValue, setInputValue] = useState('')

	const { addToDo } = useContext(ToDoContext)

	const handleChangeInputValue: React.ChangeEventHandler<HTMLInputElement> | undefined = e => {
		setInputValue(e.target.value)
	}

	return (
		<div className={styles.wrapper_inputs}>
			<div className={styles.box_inputs}>
				<div className={styles.box_task}>
					<label className={styles.label}>Wpisz zadanie:</label>
					<input className={styles.input} type='text' value={inputValue} onChange={handleChangeInputValue} />
				</div>
				<div className={styles.box_btn}>
					<button className={styles.btn} onClick={() => addToDo(inputValue)}>
						Dodaj
					</button>
				</div>
			</div>
			<div className={styles.box_info}>
				<p className={styles.state_info}>
					Informacja o stanie: <span className={styles.span_state_info}>XX</span>
				</p>
				<p className={styles.task_info}>
					Ilość zadań: <span className={styles.span_task_info}>XX</span>
				</p>
			</div>
		</div>
	)
}

export default Inputs
