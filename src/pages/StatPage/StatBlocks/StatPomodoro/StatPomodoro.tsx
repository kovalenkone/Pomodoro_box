import styles from './statpomodoro.module.css';

interface IStatPomodoroProps {
  pomodoroCount: number
}

export function StatPomodoro({ pomodoroCount }: IStatPomodoroProps) {
  return (
    <div className={'statBlock' + ' ' + styles.block}>
      {pomodoroCount === 0 ? (
        <img src="img/tomato-stat-empty.png" alt="" />
      ) : (
        <>
          <div className={styles.blockTop}>
            <img src="img/tomato-stat-notempty.png" alt="" />
            <span className={styles.counter}>x {pomodoroCount}</span>
          </div>
          <div className={styles.blockBottom}>
            {pomodoroCount} помидора
          </div>
        </>
      )}
    </div>
  );
}
