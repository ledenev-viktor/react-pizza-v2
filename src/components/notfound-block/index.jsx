import React from 'react';
import styles from './not-found-block.module.scss';
console.log(styles);

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено</h1>
      <p>К сожалению данная страница не найдена в нашем интернет-магазине</p>
    </div>
  );
};
