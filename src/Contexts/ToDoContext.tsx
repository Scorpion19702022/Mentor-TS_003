import { createContext, useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { ToDoItemType } from '../Types'

type InitialStateType = {
	toDos: ToDoItemType[]
	infoStatus: string
	infoTab: number
	addToDo: (valueFromInput: string) => void
	deleteToDo: (id: string) => void
	completeToDo: (id: string) => void
}

type ToDoProviderType = {
	children: React.ReactNode
}

const InitialState: InitialStateType = {
	toDos: [],
	infoStatus: '',
	infoTab: 0,
	addToDo: (valueFromInput: string) => {},
	deleteToDo: (id: string) => {},
	completeToDo: (id: string) => {},
}

const ToDoContext = createContext(InitialState)

export const ToDoProvider = ({ children }: ToDoProviderType) => {
	const [toDos, setToDos] = useState<ToDoItemType[]>([])

	const [infoStatus, setInfoStatus] = useState('stan akcji')
	const [infoTab, setInfoTab] = useState(toDos.length)

	useEffect(() => {
		setInfoTab(toDos.length)
	}, [toDos.length])

	// useEffect(() => {
	// 	if (toDos.length === 0) {
	// 		setTimeout(() => {
	// 			setInfoStatus('stan akcji')
	// 		}, 3000)
	// 	}
	// }, [toDos.length])

	const addToDo = (valueFromInput: string) => {
		const Task = {
			id: uuidv4(),
			task: valueFromInput,
			isComplete: false,
		}
		if (Task.task !== '' && toDos.length < 12) {
			setToDos([...toDos, Task])
			setInfoStatus('dodano prawidłowo')
		} else if (Task.task === '') {
			setInfoStatus('musisz wpisać treść')
		} else if (toDos.length >= 12) {
			setInfoStatus('dosiągąłeś maksymalną ilość zadań')
		}
	}

	const deleteToDo = (id: string) => {
		const deleteTask = toDos.filter((item: ToDoItemType) => item.id !== id)
		setToDos(deleteTask)
		if (deleteTask.length === 11) {
			setInfoStatus('teraz możesz dodać zadanie')
		} else if (deleteTask.length < 11 && deleteTask.length !== 0) {
			setInfoStatus('usunięto poprawnie zadanie')
			setTimeout(() => {
				setInfoStatus('stan akcji')
			}, 3000)
		} else if (deleteTask.length === 0) {
			setInfoStatus('usunięto wszystkie zadania')
			setTimeout(() => {
				setInfoStatus('stan akcji')
			}, 3000)
		}
	}

	const completeToDo = (id: string) => {
		const completeTasks = toDos.map((item: ToDoItemType) => {
			if (item.id === id) {
				setInfoStatus(`zadanie "${item.task}" wykonane`)
				return { ...item, isComplete: !item.isComplete }
			}

			return { ...item }
		})

		const toDoMapItem = toDos.find(item => item.isComplete && item.id === id)
		if (toDoMapItem) {
			setInfoStatus(`cofnięto wykonanie zadania "${toDoMapItem.task}"`)
		}

		setToDos(completeTasks)
	}

	return (
		<ToDoContext.Provider value={{ toDos, infoStatus, infoTab, addToDo, deleteToDo, completeToDo }}>
			{children}
		</ToDoContext.Provider>
	)
}

export default ToDoContext
