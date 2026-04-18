import uuid4 from 'uuid4';

import { CHATS_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Chat, ChatSchema, ChatsData } from '../types/chat';
import type { Message } from '@/entities/Message';
const saveChatsDataToLocalStorage = (state: ChatSchema) => {
  const chatsData = {
    chats: state.chats,
    chatMessages: state.chatMessages,
  };
  localStorage.setItem(CHATS_LOCALSTORAGE_KEY, JSON.stringify(chatsData));
};

const initialState: () => ChatSchema = () => {
  const newChatId = uuid4();
  let selectedChatId = newChatId;
  let chats: ChatSchema['chats'] = [
    {
      id: newChatId,
      name: '',
      isNew: true,
    },
  ];
  let chatMessages: ChatSchema['chatMessages'] = {
    [newChatId]: [],
  };
  const chatsDataString = localStorage.getItem(CHATS_LOCALSTORAGE_KEY);
  if (chatsDataString) {
    try {
      const chatsData = JSON.parse(chatsDataString) as ChatsData;
      const lastChat = chatsData.chats.at(-1);
      if (lastChat?.isNew) {
        chats = chatsData.chats;
        chatMessages = chatsData.chatMessages;
        selectedChatId = lastChat.id;
      } else {
        chats = [...chatsData.chats, ...chats];
        Object.assign(chatMessages, chatsData.chatMessages);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return {
    chats,
    chatMessages,
    selectedChatId,
    chatSearchResult: [],
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
    setChatSearchResult: (state, action: PayloadAction<Chat[]>) => {
      state.chatSearchResult = action.payload;
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
      saveChatsDataToLocalStorage(state);
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
      saveChatsDataToLocalStorage(state);
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
      saveChatsDataToLocalStorage(state);
    },
    searchChats: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload.trim().toLowerCase();

      if (searchValue === '') {
        state.chatSearchResult = [];
        return;
      }

      state.chatSearchResult = state.chats.filter(({ id, name }) => {
        if (name.toLowerCase().includes(searchValue)) {
          return true;
        }

        return state.chatMessages[id].some(({ content }) =>
          content.toLowerCase().includes(searchValue),
        );
      });
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
      saveChatsDataToLocalStorage(state);
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
      saveChatsDataToLocalStorage(state);
    },
  },
});

export const { actions: chatActions } = chatSlice;
export const { reducer: chatReducer } = chatSlice;
