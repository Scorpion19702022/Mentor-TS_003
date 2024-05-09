import React from 'react'

import styles from './App.module.css'
import Inputs from './Components/Inputs'
import Result from './Components/Result'
import { ToDoProvider } from './Contexts/ToDoContext'

function App() {
	return (
		<div className={styles.wrapper}>
			<ToDoProvider>
				<Inputs />
				<Result />
			</ToDoProvider>
		</div>
	)
}

export default App
