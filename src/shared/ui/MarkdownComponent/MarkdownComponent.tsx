import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

type Props = {
  content: string;
};

export const MarkdownComponent = ({ content }: Props) => {
  return (
    <div>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        components={{
          // @ts-expect-error Property 'inline' does not exist
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                // @ts-expect-error style may be undefined
                style={oneLight}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};
