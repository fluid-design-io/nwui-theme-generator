import type { JSX } from "react";
import type { BundledLanguage } from "shiki/bundle/web";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { createHighlighter } from "shiki/bundle/web";

// Create a singleton highlighter instance
const highlighter = createHighlighter({
  themes: ["github-dark", "github-light"],
  langs: ["typescript", "css"],
});

export async function highlight(
  code: string,
  lang: BundledLanguage,
  theme = "github-dark"
) {
  const out = (await highlighter).codeToHast(code, {
    lang,
    theme,
  });

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}
