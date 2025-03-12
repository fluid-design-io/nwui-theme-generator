import { CodeBlock } from "../code-block/code-block";

interface CodePreviewProps {
  code: string;
  language: "css" | "typescript";
}

export const CodePreview = ({ code, language }: CodePreviewProps) => {
  return (
    <div className="bg-border p-2">
      <div className="bg-background flex items-center rounded-2xl sm:rounded-4xl">
        <div className="scrollbar selection:bg-muted max-h-120 min-h-120 w-full max-w-[calc(100vw-1rem)] overflow-y-auto p-6 sm:p-10">
          <CodeBlock language={language}>{code}</CodeBlock>
        </div>
      </div>
    </div>
  );
};
