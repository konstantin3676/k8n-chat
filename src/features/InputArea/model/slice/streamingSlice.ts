import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { StreamingSchema } from '../types/streaming';

const initialState: StreamingSchema = {
  status: 'idle',
  response: '',
  error: null,
};

export const streamingSlice = createSlice({
  name: 'streaming',
  initialState,
  reducers: {
    streamStart: (state) => {
      state.status = 'pending';
      state.response = '';
      state.error = null;
    },
    streamChunk: (state, action: PayloadAction<string>) => {
      state.response += action.payload;
      if (state.status === 'pending') {
        state.status = 'streaming';
      }
    },
    streamEnd: (state, action: PayloadAction<StreamingSchema['usage']>) => {
      state.status = 'done';
      if (action.payload) state.usage = action.payload;
    },
    streamError: (state, action: PayloadAction<string>) => {
      state.status = 'error';
      state.error = action.payload;
    },
    resetStream: (state) => {
      state.status = 'idle';
      state.response = '';
      state.error = null;
      state.usage = undefined;
    },
  },
});

export const { actions: streamingActions } = streamingSlice;
export const { reducer: streamingReducer } = streamingSlice;
