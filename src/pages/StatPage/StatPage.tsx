import React from 'react';
import { StatBlocks } from './StatBlocks';
import { StatHeader } from './StatHeader';
import styles from './statpage.module.css';

export function StatPage() {
  return (
    <main className={styles.main}>
      <div className='container'>
        <StatHeader />
        <StatBlocks />
      </div>
    </main>
  );
}
