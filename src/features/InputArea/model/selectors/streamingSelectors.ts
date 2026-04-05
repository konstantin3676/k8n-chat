import type { StateSchema } from '@/app/providers/StoreProvider';

export const getStreamingResponse = (state: StateSchema) =>
  state.streaming.response;
export const getStreamingStatus = (state: StateSchema) =>
  state.streaming.status;
