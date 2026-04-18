import type { StateSchema } from '@/app/providers/StoreProvider';

export const getSettingsModelOptions = (state: StateSchema) =>
  state.settings.modelOptions;
