import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { PauseIcon } from '../../../../icons/PauseIcon';
import { formatTime, SizeOptions } from '../../../../utils/formatTime';
import styles from './statpause.module.css';

interface IPauseStatProps {
  pauseTime: number
}

export function StatPause({ pauseTime }: IPauseStatProps) {
  const [isEmpty, setIsEmpty] = useState(true)
  const time = formatTime(pauseTime, SizeOptions.short)

  useEffect(() => {
    pauseTime > 0 ? setIsEmpty(false) : setIsEmpty(true)
  }, [pauseTime])

  const blockClass = classNames(
    'statBlock' + ' ' + styles.block,
    { [styles.colorBlock]: !isEmpty },
  )

  return (
    <div className={blockClass}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>
          Время на паузе
        </h3>
        <span className={styles.time}>
          {time} 
        </span>
      </div>

      <PauseIcon isColor={!isEmpty} />
    </div>
  );
}
