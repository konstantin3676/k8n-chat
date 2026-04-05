import type { Message } from '@/entities/Message';

export type StreamStatus = 'idle' | 'pending' | 'streaming' | 'done' | 'error';

export type StreamingSchema = {
  status: StreamStatus;
  response: string;
  error: string | null;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type FunctionDescription = {
  name: string;
  description?: string;
  parameters: Record<string, unknown>;
  few_shot_examples?: Array<{
    request: string;
    params: Record<string, unknown>;
  }>;
  return_parameters?: Record<string, unknown>;
};

export type ChatRequest = {
  model: string;
  messages: Message[];
  stream?: boolean;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  repetition_penalty?: number;
  update_interval?: number;
  function_call?: 'none' | 'auto' | { name: string };
  functions?: FunctionDescription[];
};

export type ChatStreamChunk = {
  choices: Array<{
    delta: {
      role?: 'system' | 'user' | 'assistant' | 'function';
      content?: string;
    };
    index: number;
    finish_reason?: 'stop' | 'length' | 'function_call' | 'blacklist' | 'error';
  }>;
  created: number;
  model: string;
  object: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    precached_prompt_tokens?: number;
  };
};
