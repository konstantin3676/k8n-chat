import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { MenuItem, TextField } from '@mui/material';

import { getSettingsModelOptions } from '../../model/selectors/settingsSelectors';

type Props = {
  model: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ModelSelect = ({ model, handleChange }: Props) => {
  const modelOptions = useAppSelector(getSettingsModelOptions);

  return (
    <TextField
      fullWidth
      size="small"
      select
      label="Модель"
      name="model"
      value={model}
      onChange={handleChange}
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
