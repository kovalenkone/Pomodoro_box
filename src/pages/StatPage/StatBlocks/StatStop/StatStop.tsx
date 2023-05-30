import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { StopIcon } from '../../../../icons/StopIcon';
import styles from './statstop.module.css';

interface IPauseStatProps {
  stopCount: number
}

export function StatStop({ stopCount }: IPauseStatProps) {
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    stopCount > 0 ? setIsEmpty(false) : setIsEmpty(true)
  }, [stopCount])
  

  const blockClass = classNames(
    'statBlock' + ' ' + styles.block,
    { [styles.colorBlock]: !isEmpty },
  )

  return (
    <div className={blockClass}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>
          Остановки
        </h3>
        <span className={styles.count}>
          {stopCount} 
        </span>
      </div>

      <StopIcon isColor={!isEmpty} />
    </div>
  );
}
