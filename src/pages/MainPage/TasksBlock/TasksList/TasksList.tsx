import styles from './taskslist.module.css';

import { Task } from './Task/Task';
import { ITask } from '../../../../redux/slices/tasksSlice';

interface ITaskListProps {
  list: ITask[]
}

export function TasksList({ list }: ITaskListProps) {
  return (
    <ul className={styles.list}>
      {list.map(task => (
        <Task
          key={task.id}
          count={task.pomodoroCount} 
          title={task.title} 
          id={task.id} 
        />
      ))}
    </ul>
  );
}
