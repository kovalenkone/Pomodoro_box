import React, { ChangeEvent, useState } from 'react';
import styles from './tasksform.module.css';

import { useDispatch } from 'react-redux'
import { createTask } from '../../../../redux/slices/tasksSlice';
import { useForm, SubmitHandler } from 'react-hook-form';

type TaskTitle = {
  title: string
}

export function TasksForm() {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<TaskTitle>({})

  const onSubmit: SubmitHandler<TaskTitle> = data => {
    dispatch(createTask({id: Date.now(), title: value, pomodoroCount: 1}))
    setValue('')  
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input 
      {...register("title", { required: 'Введите название задачи', minLength: { value: 2, message: 'Введите больше двух символов' } })}
        className={styles.input} 
        placeholder='Название задачи'
        value={value}
        onChange={handleChange}
        aria-invalid={ errors.title ? 'true' : undefined }
      />
      {errors.title && <div style={{ color: 'crimson' }}>{errors.title.message}</div>}
      <button className={'commonButton' + ' ' + styles.button}>
        Добавить
      </button>
    </form>
  );
}
