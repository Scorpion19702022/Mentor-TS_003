import React from 'react'

import styles from './App.module.css'
import Inputs from './Components/Inputs'
import Result from './Components/Result'

function App() {
	return (
		<div className={styles.wrapper}>
			<Inputs />
			<Result />
		</div>
	)
}

export default App
