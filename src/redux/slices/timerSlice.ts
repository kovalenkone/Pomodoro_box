import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITasksSlice {
  isStarted: boolean
  isPause: boolean
  isBreake: boolean
  breakeCounter: number
  pomodoroCounter: number
}

const initialState: ITasksSlice = {
  isStarted: false,
  isPause: false,
  isBreake: false,
  breakeCounter: 1,
  pomodoroCounter: 1,

}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isStarted = true
    },
    stopTimer: (state) => {
      state.isStarted = false
    },
    pause: (state) => {
      state.isPause = true
    },  
    unpause: (state) => {
      state.isPause = false
    },
    setBreake: (state, actions: PayloadAction<boolean>) => {
      state.isBreake = actions.payload
    },
    increasePomodoroCounter: (state) => {
      state.pomodoroCounter++
    },
    increaseBreakeCounter: (state) => {
      state.breakeCounter++
    },
    resetTimer: () => initialState
  },
})

export const { startTimer, stopTimer, pause, unpause, setBreake, increasePomodoroCounter, increaseBreakeCounter, resetTimer } = timerSlice.actions

export default timerSlice.reducer