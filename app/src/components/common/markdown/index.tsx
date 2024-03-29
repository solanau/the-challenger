import { createElement } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type MarkdownProps = {
    as?: string;
    children: string;
};

/**
 * Parses a Markdown string to styled HTML according to
 * `@tailwindcss/typography` rules.
 */
const Markdown = ({ as = 'div', children }: MarkdownProps) =>
    createElement(
        as,
        { className: 'md prose w-full' },
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children}</ReactMarkdown>,
    );

export default Markdown;
