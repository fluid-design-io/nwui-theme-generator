"use client";

import { useState } from "react";
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { TextMono } from "../ui/text";
import { useGlobalsCssTemplate } from "./templates/globals-css";
import { useColorsTsTemplate } from "./templates/colors-ts";
import { CodePreview } from "./code-preview";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/16/solid";

const CopyButton = ({ onCopy }: { onCopy: () => void }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Button
      onClick={() => {
        onCopy();
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }}
      aria-label="Copy code to clipboard"
      title="Copy code"
      data-copied={isCopied}
      className="hover:bg-border/35 text-muted-foreground/50 data-hover:text-muted-foreground data-focus:text-muted-foreground border-l p-4 data-focus:-outline-offset-2 data-focus:outline-blue-500 data-[copied=true]:text-lime-500"
    >
      {isCopied ? (
        <ClipboardDocumentCheckIcon className="size-4" />
      ) : (
        <ClipboardDocumentListIcon className="size-4" />
      )}
      <span className="sr-only">Copy code to clipboard</span>
    </Button>
  );
};

export function ThemeCodeGen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const globalsCss = useGlobalsCssTemplate();
  const colorsTs = useColorsTsTemplate();

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedIndex === 0 ? globalsCss : colorsTs);
  };

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <div className="line-t lg:line-t/half mt-8 flex items-stretch justify-between">
        <TabList>
          <Tab className="data-hover:not-data-selected:bg-border/35 data-selected:from-border/50 data-selected:to-border border-r p-3 focus:not-data-focus:outline-none data-focus:-outline-offset-2 data-focus:outline-blue-500 data-selected:bg-gradient-to-b sm:px-6">
            <TextMono>globals.css</TextMono>
          </Tab>
          <Tab className="data-hover:not-data-selected:bg-border/35 data-selected:from-border/50 data-selected:to-border border-r p-3 focus:not-data-focus:outline-none data-focus:-outline-offset-2 data-focus:outline-blue-500 data-selected:bg-gradient-to-b sm:px-6">
            <TextMono>colors.ts</TextMono>
          </Tab>
        </TabList>
        <CopyButton onCopy={handleCopy} />
      </div>
      <TabPanels className="line-y lg:line-y/half">
        <TabPanel>
          <CodePreview code={globalsCss} language="css" />
        </TabPanel>
        <TabPanel>
          <CodePreview code={colorsTs} language="typescript" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
