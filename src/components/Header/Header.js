import React from 'react';
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
      <h1 className="text-primary text-center text-md-left mb-0">
          Rick and Morty Characters
        </h1>
      </div>
    </header>
  )
}

