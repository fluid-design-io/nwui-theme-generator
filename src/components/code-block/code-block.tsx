"use client";
import { JSX, useLayoutEffect, useState } from "react";
import { highlight } from "./shared";
import { BundledLanguage } from "shiki/bundle/web";

export function CodeBlock({
  children,
  language,
}: {
  children?: string;
  language: BundledLanguage;
}) {
  const [nodes, setNodes] = useState<JSX.Element | null>(null);

  useLayoutEffect(() => {
    if (children) {
      void highlight(children, language).then(setNodes);
    }
  }, [children, language]);

  return nodes ?? <p>Loading...</p>;
}
