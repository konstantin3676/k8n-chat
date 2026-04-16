import { chatActions, ChatButton, getChatList, getSelectedChatId } from '@/entities/Chat';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';

import styles from './ChatList.module.css';

export const ChatList = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(getChatList);
  const selectedChatId = useAppSelector(getSelectedChatId);

  return (
    <div>
      <div className={styles.title}>Чаты</div>
      <div className={styles.chatContainer}>
        {chats.map(({ id, name, isNew }) =>
          isNew ? null : (
            <ChatButton
              key={id}
              title={name}
              selected={selectedChatId === id}
              handleClick={() => dispatch(chatActions.setSelectedChatId(id))}
            />
          ),
        )}
      </div>
    </div>
  );
};
