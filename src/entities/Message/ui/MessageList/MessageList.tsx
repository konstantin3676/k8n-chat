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
      {messages.map(({ id, role, content }) =>
        role === 'user' ? (
          <UserMessage key={id} content={content} />
        ) : role === 'assistant' ? (
          <AssistantMessage key={id} content={content} />
        ) : null,
      )}
    </div>
  );
};
