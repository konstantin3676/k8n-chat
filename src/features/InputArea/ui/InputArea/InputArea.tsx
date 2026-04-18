import { useEffect, useRef, useState } from 'react';

import { chatActions, getChatMessages } from '@/entities/Chat';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { AddOutlined, ArrowUpwardOutlined, Stop } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

import { getStreamingResponse, getStreamingStatus } from '../../model/selectors/streamingSelectors';
import { streamChat } from '../../model/services/streamChat';
import { streamingActions } from '../../model/slice/streamingSlice';
import styles from './InputArea.module.css';

type Props = {
  chatId: string;
};

export const InputArea = ({ chatId }: Props) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const dispatch = useAppDispatch();
  const chatMessages = useAppSelector(getChatMessages);
  const messages = chatMessages[chatId];
  const streamingStatus = useAppSelector(getStreamingStatus);
  const streamingResponse = useAppSelector(getStreamingResponse);
  const isActiveStatus = ['pending', 'streaming'].includes(streamingStatus);

  const [value, setValue] = useState('');

  const sendMessage = () => {
    dispatch(
      chatActions.addChatMessages({
        chatId,
        messages: [{ role: 'user', content: value }],
      }),
    );
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (['Enter', 'NumEnter'].includes(e.key)) {
      if (!e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const stopStreaming = () => {
    abortControllerRef.current?.abort();
    dispatch(streamingActions.resetStream());
  };

  useEffect(() => {
    if (messages.length > 0 && messages.at(-1)?.role === 'user') {
      abortControllerRef.current = new AbortController();
      dispatch(streamChat({ messages }, abortControllerRef.current.signal));
    }
  }, [dispatch, messages]);

  useEffect(() => {
    if (streamingStatus === 'streaming') {
      if (messages.at(-1)?.role !== 'assistant') {
        dispatch(
          chatActions.addChatMessages({
            chatId,
            messages: [{ role: 'assistant', content: '' }],
          }),
        );
      }
      dispatch(
        chatActions.updateLastChatMessageContent({
          chatId,
          content: streamingResponse,
        }),
      );
    }
  }, [chatId, dispatch, messages, streamingResponse, streamingStatus]);

  return (
    <div
      className={styles.container}
      style={{
        ...(messages.length === 0
          ? {
              flexBasis: '55%',
              flexShrink: 0,
            }
          : {}),
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.controlContainer}>
          <IconButton size="small" sx={{ backgroundColor: 'common.white' }}>
            <AddOutlined sx={{ fontSize: '20px' }} />
          </IconButton>
          <TextField
            multiline
            fullWidth
            size="small"
            placeholder="Чем я могу помочь вам сегодня?"
            minRows={1}
            maxRows={5}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              '& .MuiInputBase-root': {
                padding: '4px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
          <IconButton
            size="small"
            disabled={isActiveStatus ? undefined : !value}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'var(--primary-color-hover)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'var(--btn-bg-color-disabled)',
              },
            }}
            onClick={() => (isActiveStatus ? stopStreaming() : sendMessage())}
          >
            {isActiveStatus ? (
              <Stop
                sx={{
                  fontSize: '20px',
                  color: 'common.white',
                }}
              />
            ) : (
              <ArrowUpwardOutlined
                sx={{
                  fontSize: '20px',
                  color: 'common.white',
                }}
              />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
};
