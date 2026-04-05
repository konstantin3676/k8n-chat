export type Message = {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  functions_state_id?: string;
  attachments?: string[];
};
