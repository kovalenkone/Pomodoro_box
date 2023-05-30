import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import styles from './timerbuttons.module.css';

interface ITimerButtonsProps {
  onStart: () => void
  onPause: () => void
  onStop: () => void
  onDone: () => void
  onSwitch: () => void
}

export function TimerButtons({ onStart, onStop, onDone, onPause, onSwitch }: ITimerButtonsProps) {
  const { isStarted, isPause, isBreake } = useSelector((state: RootState) => state.timer)

  return (
    <div className={styles.buttonsGroup}>
      {!isStarted && !isPause ? (
        <button 
        className={'commonButton' + ' ' + styles.buttonGreen} 
        onClick={onStart}
        >
          Старт
        </button>
      ) : 
      (
        <button 
        className={'commonButton' + ' ' + styles.buttonGreen} 
        onClick={onPause}
        >
          {isPause ? 'Продолжить' : 'Пауза'}
        </button>
      )}

      {!isPause && !isBreake && (
        <button 
        className={'commonButton' + ' ' + styles.buttonStop} 
        onClick={onStop} 
        disabled={!isStarted}
        >
          Стоп
        </button>
      )}

      {isPause && !isBreake && (
        <button 
        className={'commonButton' + ' ' + styles.buttonStop} 
        onClick={onDone} 
        >
          Сделано 
        </button>
      )}

      {isBreake && (
        <button 
        className={'commonButton' + ' ' + styles.buttonStop} 
        onClick={onSwitch} 
        >
          Пропустить 
        </button>
      )}
    </div>
  );
}
