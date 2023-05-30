import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISettings {
  pomododroTime: number
  shortBreakeTime: number
  longBreakeTime: number
  longBreakeAmount: number
}

export const initialState: ISettings = {
  pomododroTime: 25 * 60,
  shortBreakeTime: 5 * 60,
  longBreakeTime: 20 * 60,
  longBreakeAmount: 4,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState, 
  reducers : {
    updateSettings: (state, action: PayloadAction<ISettings>) => action.payload, 
    resetSettings: () => initialState
  }
})

export const { updateSettings, resetSettings } = settingsSlice.actions

export default settingsSlice.reducer