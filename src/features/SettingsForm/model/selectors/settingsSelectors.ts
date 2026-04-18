import type { StateSchema } from '@/app/providers/StoreProvider';

export const getSettingsModelOptions = (state: StateSchema) =>
  state.settings.modelOptions;
export const getSettingsModel = (state: StateSchema) => state.settings.model;
export const getSettingsTemperature = (state: StateSchema) =>
  state.settings.temperature;
export const getSettingsTopP = (state: StateSchema) => state.settings.topP;
export const getSettingsMaxTokens = (state: StateSchema) =>
  state.settings.maxTokens;
export const getSettingsRepetitionPenalty = (state: StateSchema) =>
  state.settings.repetitionPenalty;
