import styles from './timerblock.module.css';

import { TimerHeader } from './TimerHeader';
import { TimerContainer } from './TimerContainer';
import { ITask } from '../../../redux/slices/tasksSlice';

interface ITimerBlockProps {
  task: ITask | null
}

export function TimerBlock({ task }: ITimerBlockProps) {
  return (
    <div className={styles.block}>
      <TimerHeader title={task ? task.title : 'Задач нет'} />
      
      {task ? (
        <TimerContainer 
        id={task.id}
        title={task.title} 
        pomodoroCount={task.pomodoroCount}
      />
      ) : (
        <div className={styles.empty}>
          <p>Задач пока что нет</p>
        </div>
      )}
    </div>
  );
}
