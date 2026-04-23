"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/tailwind";
import {
  markdownArticleStyles,
  markdownBlockquoteStyles,
  markdownCodeBlockStyles,
  markdownDividerStyles,
  markdownH1Styles,
  markdownH2Styles,
  markdownH3Styles,
  markdownH4Styles,
  markdownHeadingStyles,
  markdownInlineCodeStyles,
  markdownLinkStyles,
  markdownListStyles,
  markdownParagraphStyles,
} from "../styles";
import type { DocumentMarkdownProps } from "../types";

const SPECIAL_LINE_REGEX =
  /^(#{1,6}\s+|```|>\s?|[-*]\s+|\d+\.\s+|---+$|\*\*\*+$)/;

function isSpecialLine(line: string) {
  return SPECIAL_LINE_REGEX.test(line.trim());
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const tokens = text.split(
    /(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^)]+\))/g,
  );

  return tokens
    .filter((token) => token.length > 0)
    .map((token, index) => {
      const key = `${keyPrefix}-${index}`;

      if (token.startsWith("**") && token.endsWith("**")) {
        return <strong key={key}>{token.slice(2, -2)}</strong>;
      }

      if (token.startsWith("`") && token.endsWith("`")) {
        return (
          <code key={key} className={markdownInlineCodeStyles()}>
            {token.slice(1, -1)}
          </code>
        );
      }

      if (token.startsWith("_") && token.endsWith("_")) {
        return <em key={key}>{token.slice(1, -1)}</em>;
      }

      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isExternal = /^https?:\/\//.test(href);

        if (isExternal) {
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={markdownLinkStyles()}
            >
              {label}
            </a>
          );
        }

        return (
          <Link key={key} href={href} className={markdownLinkStyles()}>
            {label}
          </Link>
        );
      }

      return <React.Fragment key={key}>{token}</React.Fragment>;
    });
}

export function DocumentMarkdown({ markdown }: DocumentMarkdownProps) {
  const lines = React.useMemo(
    () => markdown.replace(/\r\n/g, "\n").split("\n"),
    [markdown],
  );

  const content = React.useMemo(() => {
    const blocks: React.ReactNode[] = [];
    let cursor = 0;
    let blockIndex = 0;

    while (cursor < lines.length) {
      const rawLine = lines[cursor];
      const line = rawLine.trim();

      if (!line) {
        cursor += 1;
        continue;
      }

      if (line.startsWith("```")) {
        const language = line.slice(3).trim();
        cursor += 1;
        const codeLines: string[] = [];

        while (cursor < lines.length && !lines[cursor].trim().startsWith("```")) {
          codeLines.push(lines[cursor]);
          cursor += 1;
        }

        if (cursor < lines.length) {
          cursor += 1;
        }

        blocks.push(
          <pre
            key={`code-${blockIndex}`}
            className={markdownCodeBlockStyles()}
            data-language={language || undefined}
          >
            <code>{codeLines.join("\n")}</code>
          </pre>,
        );
        blockIndex += 1;
        continue;
      }

      const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
      if (headingMatch) {
        const [, hashes, headingText] = headingMatch;
        const level = hashes.length;
        const headingClass = cn(
          markdownHeadingStyles(),
          level === 1 && markdownH1Styles(),
          level === 2 && markdownH2Styles(),
          level === 3 && markdownH3Styles(),
          level === 4 && markdownH4Styles(),
        );

        if (level === 1) {
          blocks.push(
            <h1 key={`h1-${blockIndex}`} className={headingClass}>
              {renderInline(headingText, `h1-${blockIndex}`)}
            </h1>,
          );
        } else if (level === 2) {
          blocks.push(
            <h2 key={`h2-${blockIndex}`} className={headingClass}>
              {renderInline(headingText, `h2-${blockIndex}`)}
            </h2>,
          );
        } else if (level === 3) {
          blocks.push(
            <h3 key={`h3-${blockIndex}`} className={headingClass}>
              {renderInline(headingText, `h3-${blockIndex}`)}
            </h3>,
          );
        } else {
          blocks.push(
            <h4 key={`h4-${blockIndex}`} className={headingClass}>
              {renderInline(headingText, `h4-${blockIndex}`)}
            </h4>,
          );
        }

        cursor += 1;
        blockIndex += 1;
        continue;
      }

      if (/^---+$/.test(line) || /^\*\*\*+$/.test(line)) {
        blocks.push(<hr key={`hr-${blockIndex}`} className={markdownDividerStyles()} />);
        cursor += 1;
        blockIndex += 1;
        continue;
      }

      if (line.startsWith(">")) {
        const quoteLines: string[] = [];

        while (cursor < lines.length && lines[cursor].trim().startsWith(">")) {
          quoteLines.push(lines[cursor].trim().replace(/^>\s?/, ""));
          cursor += 1;
        }

        blocks.push(
          <blockquote key={`quote-${blockIndex}`} className={markdownBlockquoteStyles()}>
            {renderInline(quoteLines.join(" "), `quote-${blockIndex}`)}
          </blockquote>,
        );
        blockIndex += 1;
        continue;
      }

      if (/^[-*]\s+/.test(line)) {
        const items: string[] = [];
        while (cursor < lines.length && /^[-*]\s+/.test(lines[cursor].trim())) {
          items.push(lines[cursor].trim().replace(/^[-*]\s+/, ""));
          cursor += 1;
        }

        blocks.push(
          <ul key={`ul-${blockIndex}`} className={markdownListStyles()}>
            {items.map((item, itemIndex) => (
              <li key={`ul-${blockIndex}-${itemIndex}`}>
                {renderInline(item, `ul-${blockIndex}-${itemIndex}`)}
              </li>
            ))}
          </ul>,
        );
        blockIndex += 1;
        continue;
      }

      if (/^\d+\.\s+/.test(line)) {
        const items: string[] = [];
        while (cursor < lines.length && /^\d+\.\s+/.test(lines[cursor].trim())) {
          items.push(lines[cursor].trim().replace(/^\d+\.\s+/, ""));
          cursor += 1;
        }

        blocks.push(
          <ol key={`ol-${blockIndex}`} className={markdownListStyles()}>
            {items.map((item, itemIndex) => (
              <li key={`ol-${blockIndex}-${itemIndex}`}>
                {renderInline(item, `ol-${blockIndex}-${itemIndex}`)}
              </li>
            ))}
          </ol>,
        );
        blockIndex += 1;
        continue;
      }

      const paragraphLines: string[] = [line];
      cursor += 1;
      while (
        cursor < lines.length &&
        lines[cursor].trim() &&
        !isSpecialLine(lines[cursor])
      ) {
        paragraphLines.push(lines[cursor].trim());
        cursor += 1;
      }

      blocks.push(
        <p key={`p-${blockIndex}`} className={markdownParagraphStyles()}>
          {renderInline(paragraphLines.join(" "), `p-${blockIndex}`)}
        </p>,
      );
      blockIndex += 1;
    }

    return blocks;
  }, [lines]);

  return <article className={markdownArticleStyles()}>{content}</article>;
}
