import { getStreamingStatus } from '@/features/InputArea';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';

import { AssistantMessage } from '../AssistantMessage/AssistantMessage';
import { LoadingMessage } from '../LoadingMessage/LoadingMessage';
import { UserMessage } from '../UserMessage/UserMessage';
import styles from './MessageList.module.css';

import type { Message } from '../../model/types/message';
type Props = {
  messages: Message[];
};

export const MessageList = ({ messages }: Props) => {
  const streamingStatus = useAppSelector(getStreamingStatus);

  return (
    <div className={styles.container}>
      {messages.map(({ role, content }, idx) =>
        role === 'user' ? (
          <UserMessage key={idx} content={content} />
        ) : role === 'assistant' ? (
          <AssistantMessage key={idx} content={content} />
        ) : null,
      )}
      {streamingStatus === 'pending' && <LoadingMessage />}
    </div>
  );
};
