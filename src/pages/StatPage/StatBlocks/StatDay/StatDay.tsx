import { formatTime, SizeOptions } from '../../../../utils/formatTime';
import styles from './statday.module.css';

interface IStatDayProps {
  dayName: string
  workTime: number
}

export function StatDay({ dayName, workTime }: IStatDayProps) {
  const time = formatTime(workTime, SizeOptions.large)

  return (
    <div className={'statBlock' + ' ' + styles.block}>
      <h3 className={styles.day}>
        {dayName[0].toUpperCase() + dayName.slice(1)}
      </h3>
      {workTime === 0 ? (
        <span className={styles.info}>
          Нет данных
        </span>
      ) : (
        <span className={styles.info}>
          Вы работали над задачами в течение <span className={styles.time}>{time}</span>
        </span>
      )}
    </div>
  );
}
