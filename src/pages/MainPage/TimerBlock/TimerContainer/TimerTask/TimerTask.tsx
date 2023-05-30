import React from 'react';
import styles from './timertask.module.css';

interface ITimerTaskProps {
  title: string
}

export function TimerTask({ title }: ITimerTaskProps) {
  return (
    <div className={styles.task}>
      <span className={styles.taskNumber}>Задача 1 - </span>

      <span> {title} </span>
    </div>
  );
}
