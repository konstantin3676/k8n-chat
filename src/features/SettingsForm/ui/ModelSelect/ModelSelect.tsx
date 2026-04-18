import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { MenuItem, TextField } from '@mui/material';

import { getSettingsModelOptions } from '../../model/selectors/settingsSelectors';

export const ModelSelect = () => {
  const modelOptions = useAppSelector(getSettingsModelOptions);

  return (
    <TextField
      fullWidth
      size="small"
      select
      label="Модель"
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
    >
      {modelOptions.map(({ id }) => (
        <MenuItem key={id} value={id}>
          {id}
        </MenuItem>
      ))}
    </TextField>
  );
};
