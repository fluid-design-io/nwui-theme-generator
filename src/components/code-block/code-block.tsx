"use client";
import { JSX, useLayoutEffect, useState } from "react";
import { highlight } from "./shared";
import { BundledLanguage } from "shiki/bundle/web";
import { useTheme } from "next-themes";

export function CodeBlock({
  children,
  language,
  initial,
}: {
  children?: string;
  language: BundledLanguage;
  initial?: JSX.Element;
}) {
  const { resolvedTheme } = useTheme();
  const [nodes, setNodes] = useState<JSX.Element | null>(initial ?? null);

  useLayoutEffect(() => {
    if (children) {
      void highlight(
        children,
        language,
        resolvedTheme === "dark" ? "github-dark" : "github-light"
      ).then(setNodes);
    }
  }, [children, language, resolvedTheme]);

  return nodes ?? <p>Loading...</p>;
}
