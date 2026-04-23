import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface OpportunityMarkdownProps {
  body: string;
}

export function OpportunityMarkdown({ body }: OpportunityMarkdownProps) {
  return (
    <div className="prose-opportunity">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="mb-2 mt-4 text-base font-semibold text-foreground first:mt-0">{children}</h1>,
          h2: ({ children }) => <h2 className="mb-2 mt-4 text-sm font-semibold text-foreground first:mt-0">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-1.5 mt-3 text-sm font-medium text-foreground first:mt-0">{children}</h3>,
          p: ({ children }) => <p className="mb-3 text-sm leading-6 text-muted-foreground last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="mb-3 space-y-1 pl-4 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>,
          li: ({ children }) => <li className="text-sm leading-6 text-muted-foreground marker:text-muted-foreground/60">{children}</li>,
          a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-muted-foreground">{children}</a>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
          code: ({ children, className }) =>
            className?.includes("language-") ? (
              <code className="block w-full overflow-x-auto rounded-md border border-border/60 bg-muted/40 px-3 py-2.5 font-mono text-xs text-foreground">{children}</code>
            ) : (
              <code className="rounded border border-border/50 bg-muted/50 px-1 py-0.5 font-mono text-xs text-foreground">{children}</code>
            ),
          pre: ({ children }) => <pre className="mb-3 last:mb-0">{children}</pre>,
          blockquote: ({ children }) => <blockquote className="mb-3 border-l-2 border-border/60 pl-3 last:mb-0">{children}</blockquote>,
          hr: () => <hr className="my-3 border-border/50" />,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
