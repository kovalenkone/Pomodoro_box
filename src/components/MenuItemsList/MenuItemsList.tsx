import { useDispatch } from 'react-redux';
import { DecreaseIcon } from '../../icons/DecreaseIcon';
import { DeleteIcon } from '../../icons/DeleteIcon';
import { EditIcon } from '../../icons/EditIcon';
import { IncreaseIcon } from '../../icons/IncreaseIcon';
import { increasePomodoro, decreasePomodoro } from '../../redux/slices/tasksSlice';
import styles from './menuitemslist.module.css';

interface IMenuItemsListProps {
  id: number
  openModal: () => void
  onEdit: () => void
}

export function MenuItemsList({ id, openModal, onEdit }: IMenuItemsListProps) {
  const dispatch = useDispatch()

  return (
    <div className={styles.listContainer}>
      <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={() => dispatch(increasePomodoro(id))}>
              <IncreaseIcon />
              <span className={styles.text}>Увеличить</span>
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={() => dispatch(decreasePomodoro(id))}>
              <DecreaseIcon />
              <span className={styles.text}>Уменьшить</span>
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onEdit}>
              <EditIcon />
              <span className={styles.text}>Редактировать</span>
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={openModal}>
              <DeleteIcon />
              <span className={styles.text}>Удалить</span>
            </button>
          </li>
        </ul>
    </div>
  );
}
