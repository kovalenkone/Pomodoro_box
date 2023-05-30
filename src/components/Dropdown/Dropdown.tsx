import React, { useEffect, useRef } from 'react';
import styles from './dropdown.module.css';

interface IDropdownProps {
  button: React.ReactNode
  menu: React.ReactNode
  isOpen: boolean
  handleClose: () => void
  hanldeСlick: () => void
}

export function Dropdown({ button, menu, isOpen, handleClose, hanldeСlick }: IDropdownProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        handleClose()
      }
    }
 
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className={styles.dropdown} ref={ref} >
      <div onClick={hanldeСlick}>
        {button}
      </div>
      {isOpen && (
        <>
          {menu}  
        </>
      )}
    </div>
    
  );
}
