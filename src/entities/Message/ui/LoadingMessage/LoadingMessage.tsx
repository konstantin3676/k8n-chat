import styles from './LoadingMessage.module.css';

export const LoadingMessage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};
