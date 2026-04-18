import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { MenuItem, TextField } from '@mui/material';

import { getSettingsModel, getSettingsModelOptions } from '../../model/selectors/settingsSelectors';
import { settingsActions } from '../../model/slice/settingsSlice';

export const ModelSelect = () => {
  const dispatch = useAppDispatch();
  const modelOptions = useAppSelector(getSettingsModelOptions);
  const model = useAppSelector(getSettingsModel);

  return (
    <TextField
      fullWidth
      size="small"
      select
      label="Модель"
      value={model}
      onChange={(e) => {
        dispatch(settingsActions.setModel(e.target.value));
      }}
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
