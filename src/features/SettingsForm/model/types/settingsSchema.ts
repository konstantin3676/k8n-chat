export type Model = {
  id: string;
  type: 'chat' | 'embedder';
};

export type SettingsSchema = {
  isLoading: boolean;
  model: Model['id'];
  modelOptions: Model[];
  temperature: string;
  topP: string;
  maxTokens: string;
  repetitionPenalty: string;
  error?: string;
};

export type ModelOptionsResponse = {
  data: Model[];
};
