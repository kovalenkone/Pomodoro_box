import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import styles from './timerheader.module.css';

interface ITimerHeader {
  title: string
}

export function TimerHeader({ title }: ITimerHeader) {
  const {isStarted, isPause} = useSelector((state: RootState) => state.timer)
  const {isBreake, pomodoroCounter, breakeCounter} = useSelector((state: RootState) => state.timer)

  const headerClass = classNames(
    styles.header,
    { [styles.headerGrey]: !isStarted },
    { [styles.headerRed]: isStarted },
    { [styles.headerGreen]: isPause },
  )

  return (
    <div className={headerClass}>
      <span>
        {title}
      </span>
      <span>
        {isBreake ? `Перерыв ${breakeCounter}` : `Помидор ${pomodoroCounter}`}
      </span>
    </div>
  );
}
