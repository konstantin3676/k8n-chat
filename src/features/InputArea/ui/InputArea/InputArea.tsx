import { useEffect, useRef, useState } from 'react';

import { chatActions, getChatMessages } from '@/entities/Chat';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { AddOutlined, ArrowUpwardOutlined } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

import { getStreamingResponse, getStreamingStatus } from '../../model/selectors/streamingSelectors';
import { streamChat } from '../../model/services/streamChat';
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

  useEffect(() => {
    if (messages.length > 0 && messages.at(-1)?.role === 'user') {
      abortControllerRef.current = new AbortController();
      dispatch(
        streamChat(
          {
            model: 'GigaChat-2',
            messages,
            max_tokens: 100,
          },
          abortControllerRef.current.signal,
        ),
      );
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
    <div className={styles.container}>
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
            disabled={!value}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'var(--primary-color-hover)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'var(--btn-bg-color-disabled)',
              },
            }}
            onClick={() => sendMessage()}
          >
            <ArrowUpwardOutlined
              sx={{
                fontSize: '20px',
                color: 'common.white',
              }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
