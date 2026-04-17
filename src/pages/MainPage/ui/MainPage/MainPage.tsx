import { useState } from 'react';

import { chatActions, getChatMessages, getSelectedChatId } from '@/entities/Chat';
import { InputArea } from '@/features/InputArea';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { ChatRenameModal } from '@/widgets/ChatRenameModal';
import { ConfirmationModal } from '@/widgets/ConfirmationModal';
import { Sidebar } from '@/widgets/Sidebar';

import { ChatWindow } from '../ChatWindow/ChatWindow';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const chatMessages = useAppSelector(getChatMessages);
  const selectedChatId = useAppSelector(getSelectedChatId);

  const [openDeleteChatModal, setOpenDeleteChatModal] = useState<string | null>(
    null,
  );
  const [openRenameChatModal, setOpenRenameChatModal] = useState<string | null>(
    null,
  );

  return (
    <div className={styles.container}>
      <Sidebar
        openDeleteChatModal={(chatId: string) => setOpenDeleteChatModal(chatId)}
        openRenameChatModal={(chatId: string) => setOpenRenameChatModal(chatId)}
      />
      <div className={styles.chatContainer}>
        <ChatWindow messages={chatMessages[selectedChatId]} />
        <InputArea chatId={selectedChatId} />
      </div>
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
    </div>
  );
};
