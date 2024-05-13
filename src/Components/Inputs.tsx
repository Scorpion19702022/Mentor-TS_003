import React, { useContext, useState } from 'react'

import styles from './Inputs.module.css'
import ToDoContext from '../Contexts/ToDoContext'

const Inputs = () => {
	const { toDos, addToDo, infoStatus, infoTab } = useContext(ToDoContext)

	const [inputValue, setInputValue] = useState<string>('')

	const handleChangeInputValue: React.ChangeEventHandler<HTMLInputElement> | undefined = e => {
		setInputValue(e.target.value)
	}

	const handleAddTask = () => {
		addToDo(inputValue)
		if (toDos.length < 12) {
			setInputValue('')
		}
	}

	return (
		<div className={styles.wrapper_inputs}>
			<div className={styles.box_inputs}>
				<div className={styles.box_task}>
					<label className={styles.label}>Wpisz zadanie:</label>
					<input className={styles.input} type='text' value={inputValue} onChange={handleChangeInputValue} />
				</div>
				<div className={styles.box_btn}>
					<button className={styles.btn} onClick={handleAddTask}>
						Dodaj
					</button>
				</div>
			</div>
			<div className={styles.box_info}>
				<p className={styles.state_info_one}>
					Informacja o stanie:<span className={styles.span_state}> {infoStatus}</span>
				</p>
				<p className={styles.state_info_two}>
					Ilość zadań: <span className={styles.span_state}> {infoTab}</span>
				</p>
			</div>
		</div>
	)
}

export default Inputs
