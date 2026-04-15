import { getChatMessages } from '@/entities/Chat';
import { InputArea } from '@/features/InputArea';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { Sidebar } from '@/widgets/Sidebar';

import { ChatWindow } from '../ChatWindow/ChatWindow';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const chatMessages = useAppSelector(getChatMessages);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.chatContainer}>
        <ChatWindow messages={chatMessages['1']} />
        <InputArea chatId="1" />
      </div>
    </div>
  );
};
