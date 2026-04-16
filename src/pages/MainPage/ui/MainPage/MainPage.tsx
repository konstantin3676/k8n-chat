import { getChatMessages, getSelectedChatId } from '@/entities/Chat';
import { InputArea } from '@/features/InputArea';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { Sidebar } from '@/widgets/Sidebar';

import { ChatWindow } from '../ChatWindow/ChatWindow';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const chatMessages = useAppSelector(getChatMessages);
  const selectedChatId = useAppSelector(getSelectedChatId);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.chatContainer}>
        <ChatWindow messages={chatMessages[selectedChatId]} />
        <InputArea chatId={selectedChatId} />
      </div>
    </div>
  );
};
