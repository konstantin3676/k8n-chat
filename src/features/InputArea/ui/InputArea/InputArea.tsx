import { useCallback, useEffect, useRef, useState } from 'react';

import { chatActions, getChatMessages } from '@/entities/Chat';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { useFilePicker } from '@/shared/utils/hooks/useFilePicker';
import {
    AddPhotoAlternateOutlined, ArrowUpwardOutlined, ImageOutlined, Stop
} from '@mui/icons-material';
import { IconButton, TextField, Tooltip } from '@mui/material';

import { getStreamingResponse, getStreamingStatus } from '../../model/selectors/streamingSelectors';
import { streamChat } from '../../model/services/streamChat';
import { uploadFiles } from '../../model/services/uploadFiles';
import { streamingActions } from '../../model/slice/streamingSlice';
import styles from './InputArea.module.css';

import type { FilesUploadResponse } from '../../model/types/filesUpload';

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
  const [attachedImage, setAttachedImage] =
    useState<FilesUploadResponse | null>(null);

  const onSelectImage = useCallback(
    (selectedFiles: File[]) => {
      dispatch(uploadFiles(selectedFiles)).then(({ meta, payload }) => {
        if (meta.requestStatus === 'fulfilled' && payload) {
          setAttachedImage(payload as FilesUploadResponse);
        }
      });
    },
    [dispatch],
  );

  const { InputComponent, open: showFiles } = useFilePicker({
    accept: 'image/*',
    maxSize: 15 * 1024 * 1024,
    allowedTypes: ['image/png', 'image/jpeg', 'image/tiff', 'image/bmp'],
    onSelect: onSelectImage,
  });

  const sendMessage = () => {
    dispatch(
      chatActions.addChatMessages({
        chatId,
        messages: [
          {
            role: 'user',
            content: value,
            ...(attachedImage?.id ? { attachments: [attachedImage.id] } : {}),
          },
        ],
      }),
    );
    setValue('');
    setAttachedImage(null);
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue('');
    setAttachedImage(null);
  }, [chatId]);

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
      <InputComponent />
      <div className={styles.wrapper}>
        <div className={styles.controlContainer}>
          <Tooltip
            title={
              attachedImage
                ? `Открепить ${attachedImage.filename ? attachedImage.filename : 'изображение'}`
                : 'Прикрепить изображение'
            }
          >
            <IconButton
              size="small"
              sx={{ backgroundColor: 'common.white' }}
              onClick={() =>
                attachedImage ? setAttachedImage(null) : showFiles()
              }
            >
              {attachedImage ? (
                <ImageOutlined sx={{ fontSize: '20px' }} />
              ) : (
                <AddPhotoAlternateOutlined sx={{ fontSize: '20px' }} />
              )}
            </IconButton>
          </Tooltip>
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
