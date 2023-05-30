import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import timerReducer from './slices/timerSlice'
import settingsReducer from './slices/settingsSlice'
import statReducer from './slices/statSlice'
import selectReducer from './slices/selectSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timer: timerReducer,
    settings: settingsReducer,
    stat: statReducer,
    select: selectReducer,
  },
  devTools: true,
})

// function saveToLocalStorage(state: RootState) {
// 	try {
// 		const serializedState = JSON.stringify(state);
// 		if (typeof window !== 'undefined') {
// 			localStorage.setItem("persistentState", serializedState);
// 		}
// 	} catch (e) {
// 		console.warn(e);
// 	}
// }

// function loadFromLocalStorage() {
// 	try {
// 		if (typeof window !== 'undefined') {
// 			const serializedState = localStorage.getItem("persistentState");
// 			if (serializedState === null) return undefined;
// 			return JSON.parse(serializedState);
// 		}
// 	} catch (e) {
// 		console.warn(e);
// 		return undefined;
// 	}
// }

// store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
