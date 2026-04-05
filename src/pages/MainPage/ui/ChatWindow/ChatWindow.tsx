import { MessageList } from '@/entities/Message';

import styles from './ChatWindow.module.css';

import type { Message } from '@/entities/Message';

type Props = {
  messages: Message[];
};

export const ChatWindow = ({ messages }: Props) => {
  return (
    <div className={styles.container}>
      <MessageList messages={messages} />
    </div>
  );
};
