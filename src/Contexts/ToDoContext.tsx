import { createContext, useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { ToDoItemType } from '../Types'

type InitialStateType = {
	toDos: ToDoItemType[]
	infoStatus: string
	infoTab: number
	emptyArray: string[] | number[] | boolean[]
	addToDo: (valueFromInput: string) => void
	deleteToDo: (id: string) => void
	completeToDo: (id: string) => void
	sortToDo: (toDos: ToDoItemType[]) => void
	deleteAll: () => void
}

type ToDoProviderType = {
	children: React.ReactNode
}

const InitialState: InitialStateType = {
	toDos: [],
	infoStatus: '',
	infoTab: 0,
	emptyArray: [],
	addToDo: (valueFromInput: string) => {},
	deleteToDo: (id: string) => {},
	completeToDo: (id: string) => {},
	sortToDo: (toDos: ToDoItemType[]) => {},
	deleteAll: () => {},
}

const ToDoContext = createContext(InitialState)

export const ToDoProvider = ({ children }: ToDoProviderType) => {
	const [toDos, setToDos] = useState<ToDoItemType[]>([])

	const [infoStatus, setInfoStatus] = useState('stan akcji')
	const [infoTab, setInfoTab] = useState(toDos.length)

	const [emptyArray, setEmptyArray] = useState([])

	useEffect(() => {
		setInfoTab(toDos.length)
	}, [toDos.length])

	const addToDo = (valueFromInput: string) => {
		const Task = {
			id: uuidv4(),
			task: valueFromInput,
			isComplete: false,
		}
		if (Task.task !== '' && toDos.length < 12) {
			setToDos([...toDos, Task])
			setInfoStatus('dodano prawidłowo')
			setTimeout(() => {
				setInfoStatus('stan akcji')
			}, 3000)
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

	const sortToDo = (toDos: ToDoItemType[]) => {
		// const sortTask = toDos.map(item => item.task)
		toDos.sort((a, b) => {
			// Tutaj musisz określić sposób sortowania
			// na przykład, sortowanie alfabetyczne
			if (a.task < b.task) return -1
			if (a.task > b.task) return 1
			return 0
		})

		// console.log(sortTask)
		// Tutaj możesz przypisać posortowane wartości z powrotem do toDos
	}

	const deleteAll = () => {
		setToDos(emptyArray)
		setInfoStatus('usunięto wszystkie zadania')
		setTimeout(() => {
			setInfoStatus('stan akcji')
		}, 3000)
	}

	return (
		<ToDoContext.Provider
			value={{ toDos, infoStatus, infoTab, emptyArray, addToDo, deleteToDo, completeToDo, sortToDo, deleteAll }}
		>
			{children}
		</ToDoContext.Provider>
	)
}

export default ToDoContext
