import { CodeBlock } from "../code-block/code-block";

interface CodePreviewProps {
  code: string;
  language: "css" | "typescript";
}

export const CodePreview = ({ code, language }: CodePreviewProps) => {
  return (
    <div className='bg-border p-2'>
      <div className='flex items-center rounded-2xl bg-background sm:rounded-4xl'>
        <div className='max-h-120 max-w-[calc(100vw-2rem)] scrollbar overflow-y-auto min-h-120 w-full sm:p-10 p-6 selection:bg-muted'>
          <CodeBlock language={language}>{code}</CodeBlock>
        </div>
      </div>
    </div>
  );
};
