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
  const { theme } = useTheme();
  const [nodes, setNodes] = useState<JSX.Element | null>(initial ?? null);

  useLayoutEffect(() => {
    if (children) {
      void highlight(
        children,
        language,
        theme === "dark" ? "github-dark" : "github-light"
      ).then(setNodes);
    }
  }, [children, language, theme]);

  return nodes ?? <p>Loading...</p>;
}
