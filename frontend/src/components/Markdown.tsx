import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  content: string;
}

const Markdown = (props: MarkdownProps) => {
  const components: Components = {
    h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold">{children}</h3>,
    p: ({ children }) => (
      <p className="mb-6 text-base whitespace-pre-wrap">{children}</p>
    ),
  };

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
      {props.content}
    </ReactMarkdown>
  );
};

export default Markdown;
