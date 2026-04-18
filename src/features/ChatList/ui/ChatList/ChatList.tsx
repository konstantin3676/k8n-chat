import {
    chatActions, ChatButton, getChatList, getChatSearchResult, getSelectedChatId
} from '@/entities/Chat';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';

import styles from './ChatList.module.css';

type Props = {
  isSearchMode: boolean;
  openDeleteChatModal: (chatId: string) => void;
  openRenameChatModal: (chatId: string) => void;
};

export const ChatList = ({
  isSearchMode,
  openDeleteChatModal,
  openRenameChatModal,
}: Props) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(getChatList);
  const chatSearchResult = useAppSelector(getChatSearchResult);
  const selectedChatId = useAppSelector(getSelectedChatId);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Чаты</div>
      <div className={styles.chatContainer}>
        {(isSearchMode ? chatSearchResult : chats).map(({ id, name, isNew }) =>
          isNew ? null : (
            <ChatButton
              key={id}
              title={name}
              selected={selectedChatId === id}
              handleClick={() => dispatch(chatActions.setSelectedChatId(id))}
              openRenameChatModal={() => openRenameChatModal(id)}
              openDeleteChatModal={() => openDeleteChatModal(id)}
            />
          ),
        )}
      </div>
    </div>
  );
};
