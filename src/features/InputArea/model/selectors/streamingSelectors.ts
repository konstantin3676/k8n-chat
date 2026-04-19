import type { StateSchema } from '@/app/providers/StoreProvider';

export const getStreamingResponse = (state: StateSchema) =>
  state.streaming.response;
export const getStreamingStatus = (state: StateSchema) =>
  state.streaming.status;
export const getStreamingError = (state: StateSchema) => state.streaming.error;
