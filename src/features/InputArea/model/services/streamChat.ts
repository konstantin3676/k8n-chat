import type { AppThunk } from '@/app/providers/StoreProvider';
import type {
  ChatRequest,
  ChatStreamChunk,
  StreamingSchema,
} from '../types/streaming';
import { userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { isValidAccessToken } from '@/shared/utils/isValidAccessToken';

import { streamingActions } from '../slice/streamingSlice';

const parseSSELine = (line: string): ChatStreamChunk | '[DONE]' | null => {
  if (!line.startsWith('data: ')) return null;
  const data = line.slice(6).trim();
  if (data === '[DONE]') return '[DONE]';
  try {
    return JSON.parse(data) as ChatStreamChunk;
  } catch {
    return null;
  }
};

export const streamChat =
  (request: ChatRequest, signal?: AbortSignal): AppThunk =>
  async (dispatch, getState) => {
    dispatch(streamingActions.streamStart());
    const state = getState();
    const authData = state.user.authData;

    if (authData && !isValidAccessToken(authData.expires_at)) {
      dispatch(userActions.setAuthData(null));
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData?.access_token}`,
            Accept: 'text/event-stream',
          },
          body: JSON.stringify({ ...request, stream: true }),
          signal,
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('ReadableStream not supported');

      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let lastUsage: StreamingSchema['usage'];

      while (true) {
        if (signal?.aborted) break;

        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;

          const parsed = parseSSELine(line);
          if (parsed === '[DONE]') {
            dispatch(streamingActions.streamEnd(lastUsage));
            return;
          }

          if (parsed?.choices?.[0]?.delta?.content) {
            dispatch(
              streamingActions.streamChunk(parsed.choices[0].delta.content),
            );
          }

          if (parsed?.usage) {
            lastUsage = parsed.usage;
          }
        }
      }

      dispatch(streamingActions.streamEnd(lastUsage));
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        dispatch(streamingActions.streamEnd());
        return;
      }
      dispatch(
        streamingActions.streamError(
          err instanceof Error ? err.message : 'Unknown error',
        ),
      );
    }
  };
