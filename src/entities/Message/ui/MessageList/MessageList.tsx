import type { Message } from '../../model/types/message';
import { AssistantMessage } from '../AssistantMessage/AssistantMessage';
import { UserMessage } from '../UserMessage/UserMessage';
import styles from './MessageList.module.css';

type Props = {
  messages: Message[];
};

export const MessageList = ({ messages }: Props) => {
  return (
    <div className={styles.container}>
      {messages.map(({ role, content }, idx) =>
        role === 'user' ? (
          <UserMessage key={idx} content={content} />
        ) : role === 'assistant' ? (
          <AssistantMessage key={idx} content={content} />
        ) : null,
      )}
    </div>
  );
};
