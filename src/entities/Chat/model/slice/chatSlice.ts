import uuid4 from 'uuid4';

import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Chat, ChatSchema } from '../types/chat';
import type { Message } from '@/entities/Message';

const initialState: () => ChatSchema = () => {
  const newChatId = uuid4();

  return {
    chats: [
      {
        id: newChatId,
        name: '',
        isNew: true,
      },
    ],
    chatMessages: {
      [newChatId]: [],
    },
    selectedChatId: newChatId,
  };
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setSelectedChatId: (state, action: PayloadAction<string>) => {
      state.selectedChatId = action.payload;
    },
    addNewChat: (state) => {
      const lastChat = state.chats.at(-1);
      if (lastChat?.isNew) {
        state.selectedChatId = lastChat.id;
        return;
      }
      const newChatId = uuid4();
      state.chats.push({
        id: newChatId,
        name: '',
        isNew: true,
      });
      state.chatMessages[newChatId] = [];
      state.selectedChatId = newChatId;
    },
    renameChat: (
      state,
      {
        payload: { chatId, newName },
      }: PayloadAction<{ chatId: string; newName: string }>,
    ) => {
      const chat = state.chats.find(({ id }) => id === chatId);
      if (chat) {
        chat.name = newName;
      }
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      state.chats = state.chats.filter(({ id }) => id !== chatId);
      delete state.chatMessages[chatId];
      if (state.selectedChatId === chatId) {
        const existingNewChat = state.chats.find(({ isNew }) => isNew);
        if (existingNewChat) {
          state.selectedChatId = existingNewChat.id;
        } else {
          const newChatId = uuid4();
          state.chats.push({
            id: newChatId,
            name: '',
            isNew: true,
          });
          state.chatMessages[newChatId] = [];
          state.selectedChatId = newChatId;
        }
      }
    },
    addChatMessages: (
      state,
      {
        payload: { chatId, messages },
      }: PayloadAction<{ chatId: string; messages: Message[] }>,
    ) => {
      const chatMessages = state.chatMessages[chatId];
      if (chatMessages.length === 0) {
        const currentChat = state.chats.find(({ id }) => id === chatId);
        if (currentChat) {
          currentChat.isNew = false;
          currentChat.name = `${messages[0].content.slice(0, 50)}...`;
        }
      }
      chatMessages.push(...messages);
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
