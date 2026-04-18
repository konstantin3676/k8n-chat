import { TextField } from '@mui/material';

import { ModelSelect } from '../ModelSelect/ModelSelect';
import styles from './SettingsForm.module.css';

import type { SettingsModalData } from '../../model/types/settingsSchema';

type Props = {
  settings: SettingsModalData;
  setSettings: React.Dispatch<React.SetStateAction<SettingsModalData>>;
  errors: Record<string, boolean>;
};

export const SettingsForm = ({ settings, setSettings, errors }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <ModelSelect model={settings.model} handleChange={handleChange} />
      <TextField
        fullWidth
        size="small"
        label="Температура выборки"
        type="number"
        name="temperature"
        error={errors.temperature}
        value={settings.temperature}
        onChange={handleChange}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Вероятностная масса токенов"
        type="number"
        name="topP"
        error={errors.topP}
        value={settings.topP}
        onChange={handleChange}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Максимальное количество токенов ответа"
        type="number"
        name="maxTokens"
        error={errors.maxTokens}
        value={settings.maxTokens}
        onChange={handleChange}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Количество повторений слов"
        type="number"
        name="repetitionPenalty"
        error={errors.repetitionPenalty}
        value={settings.repetitionPenalty}
        onChange={handleChange}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
    </div>
  );
};
