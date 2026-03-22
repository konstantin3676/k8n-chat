import { MessageList } from '@/entities/Message';

export const ChatWindow = () => {
  return (
    <div>
      <MessageList messages={[]} />
    </div>
  );
};
