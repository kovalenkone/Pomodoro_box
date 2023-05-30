import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { PlusIcon } from '../../../../../icons/PlusIcon';
import { increasePomodoro } from '../../../../../redux/slices/tasksSlice';
import styles from './timer.module.css';

interface ITimerProps {
  id: number
  timeLeft: number
  isStarted: boolean
  isPause: boolean
}

const formatTime = (time: number) => time < 10 ? time.toString().padStart(2, '0') : time

export function Timer({ id, timeLeft, isStarted, isPause }: ITimerProps) {
  const dispatch = useDispatch()

  const minutes = formatTime(Math.floor(timeLeft / 60)) 
  const seconds = formatTime(Math.floor(timeLeft - Number(minutes) * 60))

  const timeClass = classNames(
    styles.time,
    { [styles.timeRed]: isStarted },
    { [styles.timerGreen]: isPause },
  )

  return (
    <div className={styles.timer}>
      <span className={timeClass}>
        {minutes} : {seconds}
      </span>

      <button className={styles.buttonAdd} onClick={() => dispatch(increasePomodoro(id))} >
        <PlusIcon />
      </button>
    </div>
  );
}
