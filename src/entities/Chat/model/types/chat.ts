import type { Message } from '@/entities/Message';

export type Chat = {
  id: string;
  name: string;
};

export type ChatMessages = Record<string, Message[]>;

export type ChatSchema = {
  chats: Chat[];
  chatMessages: ChatMessages;
};
