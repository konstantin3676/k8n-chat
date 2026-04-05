import { useEffect, useRef } from 'react';

import { MessageList } from '@/entities/Message';
import { getStreamingResponse } from '@/features/InputArea';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';

import styles from './ChatWindow.module.css';

import type { Message } from '@/entities/Message';
type Props = {
  messages: Message[];
};

export const ChatWindow = ({ messages }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const streamingResponse = useAppSelector(getStreamingResponse);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [streamingResponse]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <MessageList messages={messages} />
        <div className={styles.mark} ref={scrollRef} />
      </div>
    </div>
  );
};
