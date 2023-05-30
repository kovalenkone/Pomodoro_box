import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseBreakeTime, increaseDonePomodoro, increasePauseTime, increaseStopCount, increaseWorkTime } from '../../../../redux/slices/statSlice';
import { deleteTask } from '../../../../redux/slices/tasksSlice';
import { stopTimer, increaseBreakeCounter, increasePomodoroCounter, setBreake, unpause, startTimer, pause, resetTimer } from '../../../../redux/slices/timerSlice';
import { RootState } from '../../../../redux/store';
import { Timer } from './Timer/Timer';
import { TimerButtons } from './TimerButtons';
import styles from './timercontainer.module.css';
import { TimerTask } from './TimerTask';

interface ITimerContainerProps {
  id: number
  title: string
  pomodoroCount: number
}

export function TimerContainer({ id, title, pomodoroCount }: ITimerContainerProps) {
  const { pomododroTime, shortBreakeTime, longBreakeTime, longBreakeAmount } = useSelector((state: RootState) => state.settings)
  const {isStarted, isPause, isBreake, pomodoroCounter, breakeCounter} = useSelector((state: RootState) => state.timer)
  const dispatch = useDispatch()
  
  const [timeLeft, setTimeLeft]  = useState(pomododroTime)

  const firstUpdate = useRef(true);

  useEffect(() => {
    setTimeLeft(pomododroTime)
    
  }, [pomododroTime, shortBreakeTime, longBreakeTime, longBreakeAmount])

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      dispatch(resetTimer())
      dispatch(stopTimer())
      setTimeLeft(pomododroTime)
    }
  }, [id]);

  useEffect(() => {
    if (isBreake) {
      breakeCounter % longBreakeAmount === 0 ? setTimeLeft(longBreakeTime) : setTimeLeft(shortBreakeTime)
    } else {
      setTimeLeft(pomododroTime)
    }
  }, [isBreake])

  useEffect(() => {
    const timer = setInterval(() => {
      // Таймер работает
      if (isStarted) {
        setTimeLeft(timeLeft - 1)

        isBreake ? dispatch(increaseBreakeTime()) : dispatch(increaseWorkTime())
      }

      // На паузе
      if (isPause) {
        dispatch(increasePauseTime())
      }

      // Таймер закончился
      if (timeLeft === 0) {
        clearInterval(timer)
        dispatch(stopTimer())

        if (isBreake) {
          dispatch(increaseBreakeCounter())
        } else {
          dispatch(increasePomodoroCounter())
          
          dispatch(increaseDonePomodoro())
        }

        dispatch(setBreake(!isBreake))

        if (pomodoroCounter >= pomodoroCount) {
          dispatch(deleteTask(id)) 
          dispatch(resetTimer())
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isStarted, isBreake])

  // Сброс таймера
  const resetTime = () => {
    dispatch(stopTimer())
    dispatch(unpause())
  }

  // Старт таймера
  const handleStart = () => {
    dispatch(startTimer())
  }

  // Пауза
  const handlePause = () => {
    if (isPause) {
      dispatch(unpause())
      dispatch(startTimer())
    } else {
      dispatch(pause())
      dispatch(stopTimer())
    }
  }

  // Сделано
  const handleDone = () => {
    resetTime()
    dispatch(setBreake(true))
    dispatch(increasePomodoroCounter())
  
    dispatch(increaseDonePomodoro())

    if (pomodoroCounter >= pomodoroCount) {
      dispatch(deleteTask(id)) 
      dispatch(resetTimer())
    }
  }

  // Стоп
  const handleStop = () => {
    dispatch(stopTimer())
    setTimeLeft(pomododroTime)
    
    dispatch(increaseStopCount())
  }

  // Пропустить
  const handleSwitch = () => {
    resetTime()
    dispatch(setBreake(false))
    dispatch(increaseBreakeCounter())
  }

  return (
    <div className={styles.timerContainer}>
      <Timer
        id={id} 
        timeLeft={timeLeft}
        isStarted={isStarted}
        isPause={isPause}
      />

      <TimerTask title={title} />

      <TimerButtons
        onStart={handleStart}
        onStop={handleStop}
        onDone={handleDone}
        onPause={handlePause}
        onSwitch={handleSwitch}
      />
    </div>
  );
}
