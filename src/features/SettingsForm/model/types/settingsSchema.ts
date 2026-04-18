export type Model = {
  id: string;
  type: 'chat' | 'embedder';
};

export type SettingsSchema = {
  isLoading: boolean;
  model: Model | null;
  modelOptions: Model[];
  temperature: number | null;
  topP: number | null;
  maxTokens: number | null;
  repetitionPenalty: number | null;
  error?: string;
};
