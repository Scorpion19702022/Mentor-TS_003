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

	const addToDo = (valueFromInput: string) => {
		const Task = {
			id: uuidv4(),
			task: valueFromInput,
			isComplete: false,
		}
		if (Task.task !== '' && toDos.length < 3) {
			setToDos([...toDos, Task])
			setInfoStatus('dodano prawidłowo')
		} else if (Task.task === '') {
			setInfoStatus('musisz wpisać treść')
		} else if (toDos.length >= 3) {
			setInfoStatus('dosiągąłeś maksymalną ilość zadań')
		}
	}

	const deleteToDo = (id: string) => {
		const deleteTask = toDos.filter((item: ToDoItemType) => item.id !== id)
		setToDos(deleteTask)
	}

	const completeToDo = (id: string) => {
		const completeTasks = toDos.map((item: ToDoItemType) => {
			if (item.id === id) {
				return { ...item, isComplete: !item.isComplete }
			}

			return { ...item }
		})

		setToDos(completeTasks)
	}

	return (
		<ToDoContext.Provider value={{ toDos, infoStatus, infoTab, addToDo, deleteToDo, completeToDo }}>
			{children}
		</ToDoContext.Provider>
	)
}

export default ToDoContext
