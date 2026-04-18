import { useState } from 'react';

import { getSettings, settingsActions, SettingsForm } from '@/features/SettingsForm';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { useValidateNum } from '@/shared/utils/hooks/useValidateNum';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import type { SettingsModalData } from '@/features/SettingsForm';
type Props = {
  open: boolean;
  onClose: () => void;
};

export const SettingsModal = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const currentSettings = useAppSelector(getSettings);

  const [settings, setSettings] = useState<SettingsModalData>({
    model: currentSettings.model,
    temperature: String(currentSettings.temperature ?? ''),
    topP: String(currentSettings.topP ?? ''),
    maxTokens: String(currentSettings.maxTokens ?? ''),
    repetitionPenalty: String(currentSettings.repetitionPenalty ?? ''),
  });

  const [errorsData, setErrorsData] = useState<Record<string, boolean>>({});
  const { validateNum } = useValidateNum();

  const saveSettings = () => {
    const errors: Record<string, boolean> = {};
    const temperature = validateNum({
      value: settings.temperature,
      min: 0,
    });
    if (temperature === false) {
      errors.temperature = true;
    }
    const topP = validateNum({
      value: settings.topP,
      min: 0,
      max: 1,
    });
    if (topP === false) {
      errors.topP = true;
    }
    const maxTokens = validateNum({
      value: settings.maxTokens,
      min: 1,
    });
    if (maxTokens === false) {
      errors.maxTokens = true;
    }
    const repetitionPenalty = validateNum({
      value: settings.repetitionPenalty,
      min: 0,
    });
    if (repetitionPenalty === false) {
      errors.repetitionPenalty = true;
    }

    if (
      temperature === false ||
      topP === false ||
      maxTokens === false ||
      repetitionPenalty === false
    ) {
      setErrorsData(errors);
      return;
    }

    dispatch(
      settingsActions.setSettings({
        model: settings.model,
        temperature,
        topP,
        maxTokens,
        repetitionPenalty,
      }),
    );
    onClose();
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
          },
        },
      }}
    >
      <DialogTitle>Настройки</DialogTitle>
      <DialogContent sx={{ width: '325px' }}>
        <SettingsForm
          settings={settings}
          setSettings={setSettings}
          errors={errorsData}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отменить</Button>
        <Button onClick={() => saveSettings()}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};
