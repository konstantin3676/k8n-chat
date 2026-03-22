import { MarkdownComponent } from '@/shared/ui/MarkdownComponent/MarkdownComponent';
import { copyToClipboard } from '@/shared/utils/copyToClipboard';
import { ContentCopyOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import styles from './AssistantMessage.module.css';

import type { Message } from '../../model/types/message';
type Props = {
  content: Message['content'];
};

export const AssistantMessage = ({ content }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <MarkdownComponent content={content} />
      </div>
      <div className={styles.buttonsContainer}>
        <Tooltip title="Копировать">
          <IconButton size="small" onClick={() => copyToClipboard(content)}>
            <ContentCopyOutlined sx={{ fontSize: '20px' }} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
