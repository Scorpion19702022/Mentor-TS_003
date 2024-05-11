import { createContext, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { ToDoItemType } from '../Types'

type InitialStateType = {
	toDos: ToDoItemType[]
	addToDo: (valueFromInput: string) => void
	deleteToDo: (id: string) => void
	completeToDo: (id: string) => void
}

type ToDoProviderType = {
	children: React.ReactNode
}

const InitialState: InitialStateType = {
	toDos: [],
	addToDo: (valueFromInput: string) => {},
	deleteToDo: (id: string) => {},
	completeToDo: (id: string) => {},
}

const ToDoContext = createContext(InitialState)

export const ToDoProvider = ({ children }: ToDoProviderType) => {
	const [toDos, setToDos] = useState<ToDoItemType[]>([])

	const addToDo = (valueFromInput: string) => {
		const Task = {
			id: uuidv4(),
			task: valueFromInput,
			isComplete: false,
		}
		if (Task.task !== '') {
			setToDos([...toDos, Task])
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

	return <ToDoContext.Provider value={{ toDos, addToDo, deleteToDo, completeToDo }}>{children}</ToDoContext.Provider>
}

export default ToDoContext
