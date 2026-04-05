import type { StateSchema } from '@/app/providers/StoreProvider';

export const getChatList = (state: StateSchema) => state.chat.chats;
export const getChatMessages = (state: StateSchema) => state.chat.chatMessages;
