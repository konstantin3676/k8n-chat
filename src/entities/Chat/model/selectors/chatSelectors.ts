import type { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

import type { Chat } from '../types/chat';

export const getChatList = (state: StateSchema) => state.chat.chats;
export const getChatMessages = (state: StateSchema) => state.chat.chatMessages;
export const getSelectedChatId = (state: StateSchema) =>
  state.chat.selectedChatId;

export const getChatById = createSelector<
  [(state: StateSchema) => Chat[]],
  Record<string, Chat>
>([getChatList], (chats) => {
  return chats.reduce(
    (acc, chat) => ({
      ...acc,
      [chat.id]: chat,
    }),
    {},
  );
});
