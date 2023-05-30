import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SettingsIcon } from '../../icons/SettingsIcon';
import { StatIcon } from '../../icons/StatIcon';
import { Settings } from '../Settings';
import styles from './header.module.css';

export function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.container + ' ' + 'container'}>
        <Link to="/" className={styles.threadTitle}>
          <img src="./img/tomato-logo.png" width={40} height={40} alt="Логотип" />
          <h1 className={styles.title}>pomodoro_box</h1>
        </Link>

        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.link} onClick={() => setIsSettingsOpen(true)}>
              <SettingsIcon />
              Настройки
            </button>
          </li>

          <li className={styles.item}>
            <Link to="/stat" className={styles.link}>
              <StatIcon />
              Статистика
            </Link>
          </li>
        </ul>

        {isSettingsOpen && (
          <Settings onClose={() => setIsSettingsOpen(false)} />
        )}
      </div>
    </header>
  );
}
