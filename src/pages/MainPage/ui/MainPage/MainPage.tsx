import { useEffect, useState } from 'react';

import { chatActions, getChatMessages, getSelectedChatId } from '@/entities/Chat';
import { getStreamingError, InputArea, streamingActions } from '@/features/InputArea';
import { fetchModelOptions, settingsActions } from '@/features/SettingsForm';
import { AppAlert } from '@/shared/ui/AppAlert/AppAlert';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { ChatRenameModal } from '@/widgets/ChatRenameModal';
import { ConfirmationModal } from '@/widgets/ConfirmationModal';
import { SettingsModal } from '@/widgets/SettingsModal';
import { Sidebar } from '@/widgets/Sidebar';

import { ChatWindow } from '../ChatWindow/ChatWindow';
import styles from './MainPage.module.css';

import type { ModelOptionsResponse } from '@/features/SettingsForm';
export const MainPage = () => {
  const dispatch = useAppDispatch();
  const chatMessages = useAppSelector(getChatMessages);
  const selectedChatId = useAppSelector(getSelectedChatId);
  const streamingError = useAppSelector(getStreamingError);

  const [openDeleteChatModal, setOpenDeleteChatModal] = useState<string | null>(
    null,
  );
  const [openRenameChatModal, setOpenRenameChatModal] = useState<string | null>(
    null,
  );
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  useEffect(() => {
    dispatch(fetchModelOptions()).then(({ meta, payload }) => {
      if (meta.requestStatus === 'fulfilled' && payload) {
        dispatch(
          settingsActions.setInitModel(
            (payload as ModelOptionsResponse).data[0]?.id,
          ),
        );
      }
    });
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Sidebar
        openDeleteChatModal={(chatId: string) => setOpenDeleteChatModal(chatId)}
        openRenameChatModal={(chatId: string) => setOpenRenameChatModal(chatId)}
        openSettingsModal={() => setOpenSettingsModal(true)}
      />
      <div className={styles.chatContainer}>
        <ChatWindow messages={chatMessages[selectedChatId]} />
        <InputArea chatId={selectedChatId} />
      </div>
      {openDeleteChatModal && (
        <ConfirmationModal
          title="Удалить чат"
          okText="Удалить"
          contentText="Это действие навсегда удалит чат и не может быть отменено. Пожалуйста, подтвердите для продолжения."
          open={Boolean(openDeleteChatModal)}
          onClose={() => setOpenDeleteChatModal(null)}
          handleOkClick={() => {
            if (openDeleteChatModal) {
              dispatch(chatActions.deleteChat(openDeleteChatModal));
            }
          }}
        />
      )}
      {openRenameChatModal && (
        <ChatRenameModal
          chatId={openRenameChatModal}
          onClose={() => setOpenRenameChatModal(null)}
          renameChat={(newName: string) => {
            if (openRenameChatModal) {
              dispatch(
                chatActions.renameChat({
                  newName,
                  chatId: openRenameChatModal,
                }),
              );
            }
          }}
        />
      )}
      {openSettingsModal && (
        <SettingsModal
          open={Boolean(openSettingsModal)}
          onClose={() => setOpenSettingsModal(false)}
        />
      )}
      {streamingError && (
        <AppAlert
          content={streamingError}
          onClose={() => {
            dispatch(streamingActions.resetStream());
          }}
        />
      )}
    </div>
  );
};
