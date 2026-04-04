import { MessageList } from '@/entities/Message';

import styles from './ChatWindow.module.css';

export const ChatWindow = () => {
  return (
    <div className={styles.container}>
      <MessageList messages={[]} />
    </div>
  );
};
