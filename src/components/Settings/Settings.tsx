import React, { ChangeEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '../../icons/CloseIcon';
import { ISettings, resetSettings, updateSettings } from '../../redux/slices/settingsSlice';
import { RootState } from '../../redux/store';
import styles from './settings.module.css';
import { initialState as initialSettings } from '../../redux/slices/settingsSlice';

interface ISettingsProps {
  onClose: () => void
}

interface IInput {
  label: string
  name: string
  min: number
  max: number
  value: number
  unit: string
  onChange: any
}

export function Settings({ onClose }: ISettingsProps) {
  const [settings, setSettings] = useState<ISettings>(useSelector((state: RootState) => state.settings))
  const [settingsInputs, setSettingsInputs] = useState<IInput[]>([])
  const [pomododroTime, setPomododroTime] = useState(settings.pomododroTime / 60)
  const [shortBreakeTime, setShortBreakeTime] = useState(settings.shortBreakeTime / 60)
  const [longBreakeTime, setLongBreakeTime] = useState(settings.longBreakeTime / 60)
  const [longBreakeAmount, setLongBreakeAmount] = useState(settings.longBreakeAmount)

  const dispatch = useDispatch()

  useEffect(() => {
    setSettingsInputs([
      { label: 'Один помидор', name: 'workLimit', min: 1, max: 90, value: pomododroTime, unit: 'мин', onChange: changePomodorotime},
      { label: 'Короткий перерыв', name: 'shortBreake', min: 1, max: 90, value: shortBreakeTime, unit: 'мин', onChange: changeShortBreakeTime},
      { label: 'Длинный перерыв', name: 'longBreake', min: 1, max: 90, value: longBreakeTime, unit: 'мин', onChange: changeLongBreakeTime},
      { label: 'Длинный перервы после', name: 'longBreakeAmount', min: 2, max: 10, value: longBreakeAmount, unit: 'помидоров', onChange: changeLongBreakeAmount},
    ])

    setSettings({
      pomododroTime: pomododroTime * 60,
      shortBreakeTime: shortBreakeTime * 60,
      longBreakeTime: longBreakeTime * 60,
      longBreakeAmount,
    })
  }, [pomododroTime, shortBreakeTime, longBreakeTime, longBreakeAmount])

  const handleSave = () => {
    dispatch(updateSettings(settings))
  }

  const handleReset = () => {
    dispatch(resetSettings())

    setPomododroTime(initialSettings.pomododroTime / 60)
    setShortBreakeTime(initialSettings.shortBreakeTime / 60)
    setLongBreakeTime(initialSettings.longBreakeTime / 60)
    setLongBreakeAmount(initialSettings.longBreakeAmount)
  }

  const changePomodorotime = (event: ChangeEvent<HTMLInputElement>) => {
    setPomododroTime(Number(event.target.value))
  }

  const changeShortBreakeTime = (event: ChangeEvent<HTMLInputElement>) => {
    setShortBreakeTime(Number(event.target.value))
  }

  const changeLongBreakeTime = (event: ChangeEvent<HTMLInputElement>) => {
    setLongBreakeTime(Number(event.target.value))
  }

  const changeLongBreakeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setLongBreakeAmount(Number(event.target.value))
  }

  const node = document.getElementById('modal-root')
  if (!node) return null

  return ReactDOM.createPortal((
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Настройки
        </h2>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className={styles.body}>
        <form className={styles.form}>
          {settingsInputs.map(input => (
            <div className={styles.inputWrapper} key={input.name}>
              <label htmlFor={input.name}> {input.label} </label>
              <input
                className={styles.input}
                type="number" 
                name={input.name} 
                min={input.min} 
                max={input.max} 
                value={input.value} 
                onChange={input.onChange}
              />
              <span>{input.unit}</span>
            </div>
          ))}

          <div className={styles.buttonsGroup}>
            <button type='button' className={'commonButton' + ' ' + styles.saveButton} onClick={handleSave}>
              Сохранить
            </button>
            <button type='button' className={styles.resetButton} onClick={handleReset}>
              По умолчанию
            </button>
          </div>
        </form>
      </div>
    </div>
  ), node);
}
