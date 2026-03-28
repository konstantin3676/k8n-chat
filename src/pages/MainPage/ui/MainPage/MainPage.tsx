import { InputArea } from '@/features/InputArea/ui/InputArea/InputArea';

import { ChatWindow } from '../ChatWindow/ChatWindow';
import styles from './MainPage.module.css';

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <ChatWindow />
      <InputArea />
    </div>
  );
};
