import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

const currentDay = moment().format('YYYY.MM.DD')

interface IStatItem {
  date: string
  donePomodoroCount: number
  workTime: number
  pauseTime: number
  breakeTime: number
  stopCount: number
}

const createNewItem = (date: string): IStatItem => {
  return {
    date: date,
    donePomodoroCount: 0,
    workTime: 0,
    pauseTime: 0,
    breakeTime: 0,
    stopCount: 0,
  }
}

const initialState: IStatItem[] = [createNewItem(currentDay)]

export const statSlice = createSlice({
  name: 'stat',
  initialState, 
  reducers : {
    addNewItem: (state, actions: PayloadAction<string>) => {
      state.push(createNewItem(actions.payload))
    },
    increaseWorkTime: (state) => {
      const index = state.findIndex(item => item.date === currentDay)
      state[index].workTime++
    },
    increasePauseTime: (state) => {
      const index = state.findIndex(item => item.date === currentDay)
      state[index].pauseTime++
    },
    increaseBreakeTime: (state) => {
      const index = state.findIndex(item => item.date === currentDay)
      state[index].breakeTime++
    },
    increaseDonePomodoro: (state) => {
      const index = state.findIndex(item => item.date === currentDay)
      state[index].donePomodoroCount++
    },
    increaseStopCount: (state) => {
      const index = state.findIndex(item => item.date === currentDay)
      state[index].stopCount++
    }
  }
})

export const { addNewItem, increaseWorkTime, increasePauseTime, increaseBreakeTime, increaseDonePomodoro, increaseStopCount } = statSlice.actions

export default statSlice.reducer