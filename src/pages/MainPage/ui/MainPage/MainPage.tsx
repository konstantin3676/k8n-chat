import { ChatWindow } from '../ChatWindow/ChatWindow';
import styles from './MainPage.module.css';

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <ChatWindow />
    </div>
  );
};
