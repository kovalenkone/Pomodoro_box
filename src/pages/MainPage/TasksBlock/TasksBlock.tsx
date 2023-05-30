import { TasksForm } from './TasksForm';
import { TasksList } from './TasksList';
import { TotalTime } from './TotalTime';
import styles from './tasksblock.module.css';
import { ITask } from '../../../redux/slices/tasksSlice';

interface ITaskBlockProps {
  list: ITask[]
}

export function TasksBlock({ list }: ITaskBlockProps) {
  const instruction = [
    'Выберите категорию и напишите название текущей задачи',
    'Запустите таймер («помидор»)',
    'Работайте пока «помидор» не прозвонит',
    'Сделайте короткий перерыв (3-5 минут)',
    'Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).'
  ]

  return (
    <div className={styles.tasks}>
      <h2 className={styles.title}>
        Ура! Теперь можно начать работать:
      </h2>
      
      <ul className={styles.list}>
        {instruction.map(value => (
          <li className={styles.item} key={Math.random()}>
            {value}
          </li>
        ))}
      </ul>

      <TasksForm />  
      
      {list.length > 0 && (
        <>
         <TasksList list={list}/>
         <TotalTime list={list}/>
        </>
      )}
    </div>
  );
}
