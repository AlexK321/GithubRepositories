import React from 'react';
import styles from './CubeLoader.module.scss';

const CubeLoader: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.back} />
        <div className={styles.left} />
        <div className={styles.right} />
        <div className={styles.top} />
        <div className={styles.bottom} />
        <div className={styles.front} />
      </div>
    </div>
  );
};

export default CubeLoader;
