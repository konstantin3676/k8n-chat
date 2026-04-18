export type Model = {
  id: string;
  type: 'chat' | 'embedder';
};

export type Settings = {
  model: Model['id'];
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  repetitionPenalty?: number;
};

export type SettingsSchema = {
  settings: Settings;
  modelOptions: Model[];
  isLoading: boolean;
  error?: string;
};

export type ModelOptionsResponse = {
  data: Model[];
};

export type SettingsModalData = {
  model: string;
  temperature: string;
  topP: string;
  maxTokens: string;
  repetitionPenalty: string;
};
