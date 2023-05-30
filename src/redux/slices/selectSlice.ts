import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

export enum Periods {
  CurrentWeek,
  LastWeek,
  TwoWeeksAgo,
}

interface IState {
  selectedPeriod: Periods
  selectedDate: string
  selectedDay: string
}

const initialState: IState = {
  selectedPeriod: Periods.CurrentWeek,
  selectedDate: moment().format('YYYY.MM.DD'),
  selectedDay: moment().format('dddd'),
}

export const selectSlice = createSlice({
  name: 'select',
  initialState, 
  reducers : {
    setSelectedDate: (state, actions: PayloadAction<string>) => {
      state.selectedDate = actions.payload
      state.selectedDay = moment(actions.payload).format('dddd')
    },
    setPeriod: (state, actions: PayloadAction<Periods>) => {
      state.selectedPeriod = actions.payload
    },  
  }
})

export const { setSelectedDate, setPeriod } = selectSlice.actions

export default selectSlice.reducer