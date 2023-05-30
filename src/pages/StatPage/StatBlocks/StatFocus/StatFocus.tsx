import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FocusIcon } from '../../../../icons/FocusIcon';
import styles from './statfocus.module.css';

interface IStatFocusProps {
  workTime: number
  breakeTime: number
}

export function StatFocus({ workTime, breakeTime }: IStatFocusProps) {
  const [isEmpty, setIsEmpty] = useState(true)

  const commonTime = workTime + breakeTime
  const focusTime = Math.trunc(workTime / commonTime * 100)

  useEffect(() => {
    commonTime > 0 ? setIsEmpty(false) : setIsEmpty(true)
  }, [commonTime])

  const blockClass = classNames(
    'statBlock' + ' ' + styles.block,
    { [styles.colorBlock]: !isEmpty },
  )

  return (
    <div className={blockClass}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>
          Фокус
        </h3>
        <span className={styles.percent}>
          {isNaN(focusTime) ? 0 + '%' : focusTime + '%'}
        </span>
      </div>

      <FocusIcon isColor={!isEmpty} />
    </div>
  );
}
