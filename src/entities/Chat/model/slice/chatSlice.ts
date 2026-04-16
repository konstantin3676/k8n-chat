import uuid4 from 'uuid4';

import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Chat, ChatSchema } from '../types/chat';
import type { Message } from '@/entities/Message';
const initialState: ChatSchema = {
  chats: [],
  chatMessages: {
    '1': [],
  },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    addNewChat: (state) => {
      if (state.chats.at(-1)?.isNew) {
        return;
      }
      state.chats.push({
        id: uuid4(),
        name: '',
        isNew: true,
      });
    },
    addChatMessages: (
      state,
      {
        payload: { chatId, messages },
      }: PayloadAction<{ chatId: string; messages: Message[] }>,
    ) => {
      state.chatMessages[chatId].push(...messages);
    },
    updateLastChatMessageContent: (
      state,
      {
        payload: { chatId, content },
      }: PayloadAction<{ chatId: string; content: string }>,
    ) => {
      const lastMessage = state.chatMessages[chatId].at(-1);
      if (lastMessage) {
        lastMessage.content = content;
      }
    },
  },
});

export const { actions: chatActions } = chatSlice;
export const { reducer: chatReducer } = chatSlice;
