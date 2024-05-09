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
		<div className={styles.box_inputs}>
			<div className={styles.box_task}>
				<label>Wpisz zadanie:</label>
				<input type='text' value={inputValue} onChange={handleChangeInputValue} />
			</div>
			<div className={styles.box_btn}>
				<button className={styles.btn} onClick={() => addToDo(inputValue)}>
					Dodaj
				</button>
			</div>
		</div>
	)
}

export default Inputs
