import React from 'react';
import { TasksBlock } from './TasksBlock';
import styles from './mainpage.module.css';
import { TimerBlock } from './TimerBlock';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export function MainPage() {
  const tasksList = useSelector((state: RootState) => state.tasks)
  console.log(tasksList)

  return (
    <main className={styles.main}>
      <div className={'container' + ' ' + styles.container}>
        <TasksBlock list={tasksList} />
        <TimerBlock task={tasksList.length > 0 ? tasksList[0] : null } />
      </div>
    </main>
  );
}
