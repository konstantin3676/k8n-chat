import type { StateSchema } from '@/app/providers/StoreProvider';

export const getSettingsModelOptions = (state: StateSchema) =>
  state.settings.modelOptions;
export const getSettings = (state: StateSchema) => state.settings.settings;
