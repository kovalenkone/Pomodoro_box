import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { CloseIcon } from '../../icons/CloseIcon';
import { deleteTask } from '../../redux/slices/tasksSlice';
import styles from './modaldelete.module.css';

interface IModalDeleteProps {
  id: number
  closeModal: () => void
}

export function ModalDelete({ id, closeModal }: IModalDeleteProps) {
  const dispatch = useDispatch()
  const node = document.getElementById('modal-root')
  if (!node) return null

  return ReactDOM.createPortal((
    <div className={styles.modal}>
      <div className={styles.content}>
        <button className={styles.buttonClose} onClick={closeModal} >
          <CloseIcon />
        </button>

        <h2 className={styles.title}>Удалить задачу?</h2>

        <button className={styles.buttonDelete} onClick={() => dispatch(deleteTask(id))}>
          Удалить
        </button>

        <button className={styles.buttonCancel} onClick={closeModal} >
          Отмена
        </button>
      </div>
    </div>
  ), node)
}
