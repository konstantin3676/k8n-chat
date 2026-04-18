import { TextField } from '@mui/material';

import { ModelSelect } from '../ModelSelect/ModelSelect';
import styles from './SettingsForm.module.css';

export const SettingsForm = () => {
  return (
    <div className={styles.container}>
      <ModelSelect />
      <TextField
        fullWidth
        size="small"
        label="Температура выборки"
        type="number"
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
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
    </div>
  );
};
