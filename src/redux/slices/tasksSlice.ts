import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITask {
  id: number
  title: string
  pomodoroCount: number
}

const initialState: ITask[] = []

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<ITask>) => {
      state.push(action.payload)
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const index = state.findIndex(task => task.id === action.payload)
      state.splice(index, 1) 
    },
    editTask: (state, action: PayloadAction<any>) => {
      let index = state.findIndex(task => task.id === action.payload.id)
      state[index].title = action.payload.title
    },
    increasePomodoro: (state, action: PayloadAction<number>) => {
      let index = state.findIndex(task => task.id === action.payload) 
      state[index].pomodoroCount++
    },
    decreasePomodoro: (state, action: PayloadAction<number>) => {
      let index = state.findIndex(task => task.id === action.payload) 
      state[index].pomodoroCount > 1 && state[index].pomodoroCount--
    },
  },
})

export const { createTask, deleteTask, editTask, increasePomodoro, decreasePomodoro } = tasksSlice.actions

export default tasksSlice.reducer