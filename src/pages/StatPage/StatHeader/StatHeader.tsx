import React, { useState } from 'react';
import { Dropdown } from '../../../components/Dropdown';
import { SelectArrowIcon } from '../../../icons/SelectArrowIcon';
import styles from './statheader.module.css';
import { Periods, setPeriod } from '../../../redux/slices/selectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import classNames from 'classnames';

const selectOptions = [
  {
    name: 'Эта неделя',
    value: Periods.CurrentWeek,
  },
  {
    name: 'Прошедшая неделя',
    value: Periods.LastWeek,
  },
  {
    name: '2 недели назад',
    value: Periods.TwoWeeksAgo,
  }
]

export function StatHeader() {
  const selectedPeriod = useSelector((state: RootState) => state.select.selectedPeriod)
  const dispatch = useDispatch()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSelect = (option: Periods) => {
    dispatch(setPeriod(option))
    setIsDropdownOpen(false)
  }

  const selectClass = classNames(
    styles.selectButton,
    { [styles.active]: isDropdownOpen },
  )

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        Ваша активность
      </h2>

      <div className={styles.selectContainer}>
        <Dropdown
          isOpen={isDropdownOpen}
          handleClose={() => setIsDropdownOpen(false)}
          hanldeСlick={() => setIsDropdownOpen(!isDropdownOpen)}
          button={
            <button className={selectClass}>
              {selectOptions.find(option => option.value === selectedPeriod)?.name}
              <SelectArrowIcon />
            </button>
          }
          menu={
            <div className={styles.listContainer}>
              <ul className={styles.list}>
                {selectOptions.map(item => (
                  <li className={styles.item} key={item.value}>
                    <button
                      className={styles.button}
                      onClick={() => handleSelect(item.value)}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          } 
        />
      </div>
    </div>
  );
}
