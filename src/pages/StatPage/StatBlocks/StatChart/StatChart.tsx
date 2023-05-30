import styles from './statchart.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import classNames from 'classnames';
import { setSelectedDate } from '../../../../redux/slices/selectSlice';
import { addNewItem } from '../../../../redux/slices/statSlice';
import { useWeekdays } from '../../../../hooks/useWeekdays';

export function StatChart() {
  const [maxWorkTime, setMaxWorkTime] = useState(0)
  const statItems = useSelector((state: RootState) => state.stat)
  const dispatch = useDispatch()
  const [weekdays] = useWeekdays()

  useEffect(() => {
    const max = weekdays.reduce((prev, current) => prev > current.workTime ? prev : current.workTime, 0)
    setMaxWorkTime(max)
  }, [weekdays])

  const handleSelect = (date: string) => {
    if (!statItems.find(item => item.date === date)) dispatch(addNewItem(date))
    dispatch(setSelectedDate(date))
  }

  function secToTime(sec: number) {
		let hour = Math.floor(sec / 60);
		let min = Math.round(sec % 60);

		return `${hour} ч ${min} мин`;
	}

  const calcHeight = (time: number) => {
    let maxHeight = 365;
		let height = maxHeight / maxWorkTime * time;

		return height > 0 ? height : 5;
  }

  return (
    <div className={'statBlock' + ' ' + styles.block}>
      <div className={styles.grid}>
        <div className={styles.line}>
          <span className={styles.time}>
            {secToTime(maxWorkTime)}
          </span>
        </div>
        <div className={styles.line}>
          <span className={styles.time}>
            {secToTime(maxWorkTime / 4 * 3)}
          </span>
        </div>
        <div className={styles.line}>
          <span className={styles.time}>
            {secToTime(maxWorkTime / 4 * 2)}
          </span>
        </div>
        <div className={styles.line}>
          <span className={styles.time}>
          {secToTime(maxWorkTime / 4)}
          </span>
        </div>
      </div>

      <div className={styles.weekdays}>
        {weekdays.map(day => {
          const dayClass = classNames(
            styles.day,
            { [styles.active]: day.active },
          )

          const chartClass = classNames(
            styles.chart,
            { [styles.chartSelected]: day.active },
            { [styles.chartEmpty]: day.workTime === 0 },
            { [styles.chartFill]: day.workTime > 0 && !day.active},
          )

          return (
            <div 
              className={styles.weekday} 
              key={day.day} 
              onClick={() => handleSelect(day.date)}
            >
              <button className={dayClass}>
                {day.day}
              </button>
              <div 
                className={chartClass} 
                style={{height: calcHeight(day.workTime) + 'px'}} 
                onClick={() => handleSelect(day.date)} 
              />
            </div>
          )
        })}
      </div>
    </div>
  );
}
