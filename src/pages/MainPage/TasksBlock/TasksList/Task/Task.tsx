import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './task.module.css';

import { DottersIcon } from '../../../../../icons/DottersIcon';
import { Dropdown } from '../../../../../components/Dropdown';
import { useDispatch } from 'react-redux';
import { editTask } from '../../../../../redux/slices/tasksSlice';
import { MenuItemsList } from '../../../../../components/MenuItemsList';
import { ModalDelete } from '../../../../../components/ModalDelete';

interface ITaskProps {
  id: number
  count: number
  title: string
}

export function Task({ id, count, title }: ITaskProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [titleValue, setTitleValue] = useState(title)
  const [isDisabled, setIsDisabled] = useState(true)

  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const openModal = () => {
    setIsModalOpen(true)
    setIsDropdownOpen(false)
  }

  const onEdit = () => {
    setIsDropdownOpen(false)
    setIsDisabled(false)
    ref.current?.focus()
  }

  const onBlur = () => {
    ref.current?.blur()
    setIsDisabled(true)

    dispatch(editTask({id: id, title: titleValue}))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value)
  }

  useEffect(() => {
    !isDisabled && ref.current?.focus()
  }, [isDisabled])

  return (
    <li className={styles.item}>
      <span className={styles.count}>
        {count}
      </span>

      <input 
        disabled={isDisabled}
        ref={ref}
        value={titleValue} 
        className={styles.title}
        onBlur={onBlur}
        onChange={handleChange}
      />

      <Dropdown
        isOpen={isDropdownOpen}
        handleClose={() => setIsDropdownOpen(false)}
        hanldeСlick={() => setIsDropdownOpen(!isDropdownOpen)}
        button={
          <button className={styles.dropdownButton}>
            <DottersIcon />
          </button>
        } 
        menu={
          <MenuItemsList
            id={id}
            openModal={openModal}
            onEdit={onEdit}
          />
        }
      />

      {isModalOpen && (
        <ModalDelete 
          id={id}
          closeModal={() => setIsModalOpen(false)} 
        />
      )}
    </li>
  );
}
