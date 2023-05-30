import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import styles from './statblocks.module.css';
import { StatChart } from './StatChart';
import { StatDay } from './StatDay';
import { StatFocus } from './StatFocus';
import { StatPause } from './StatPause';
import { StatPomodoro } from './StatPomodoro';
import { StatStop } from './StatStop';
import 'moment/locale/ru';

export function StatBlocks() {
  const statItems = useSelector((state: RootState) => state.stat)
  const selectedDate = useSelector((state: RootState) => state.select.selectedDate)
  const index = statItems.findIndex(el => el.date === selectedDate)
  const statItem = statItems[index]
  
  const dayName = moment(statItem.date).format('dddd')

  return (
    <div className={styles.blocks}>
      <StatDay dayName={dayName} workTime={statItem.workTime} />
      <StatChart />
      <StatPomodoro pomodoroCount={statItem.donePomodoroCount} />
      <StatFocus workTime={statItem.workTime} breakeTime={statItem.breakeTime}/>
      <StatPause pauseTime={statItem.pauseTime}/>
      <StatStop stopCount={statItem.stopCount} />
    </div>
  );
}
