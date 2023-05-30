import React, { useEffect, useState } from 'react';
import { ITask } from '../../../../redux/slices/tasksSlice';
import { formatTime, SizeOptions } from '../../../../utils/formatTime';
import styles from './totaltime.module.css';

interface ITotalTimeProps {
  list: ITask[]
}

export function TotalTime({ list }: ITotalTimeProps) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const totalTime = list.reduce((a, b) => a = a + b.pomodoroCount, 0) * 1500
    setTime(formatTime(totalTime, SizeOptions.medium))
  }, [list])

  return (
    <span className={styles.time}>
      {time}
    </span>
  );
}
